import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Server, Socket, createServer } from 'net';
import { EventEmitter } from 'events';
import { DataService } from './data.service';
import { QueueService } from '../redis/queue.service';
import { connections, ConnectionConfig } from '../config/connections.config';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class TcpService implements OnModuleInit, OnModuleDestroy {
  private servers: Map<string, Server> = new Map();
  private clientsByProject: Map<string, Socket[]> = new Map();
  public connectionEvent = new EventEmitter();

  constructor(
    private readonly dataService: DataService,
    private readonly queueService: QueueService,
  ) {}

  onModuleInit() {
    connections.forEach((connection) => {
      this.startServer(connection);
    });
  }

  onModuleDestroy() {
    this.stopServer();
  }

  startServer(config: ConnectionConfig): void {
    const server = createServer((socket: Socket) => {
      console.log(
        `Cliente conectado a ${config.projectName}:`,
        socket.remoteAddress,
        socket.remotePort,
      );

      if (!this.clientsByProject.has(config.projectName)) {
        this.clientsByProject.set(config.projectName, []);
      }
      this.clientsByProject.get(config.projectName).push(socket);

      this.connectionEvent.emit('connected');

      socket.on('data', async (data) => {
        try {
          const receivedData = data.toString();
          const processedData = this.dataService.processData(receivedData);
          const serializedData = JSON.stringify(processedData);

          await this.queueService.enqueueData(
            [serializedData],
            config.projectName,
          );

          const xmlData = processedData.dataGroup[0]['data'];
          this.broadcastData(xmlData, socket, config.projectName);
        } catch (error) {
          console.error(`Error en ${config.projectName}:`, error.message);
        }
      });

      socket.on('end', () => {
        this.removeClient(socket, config.projectName);
      });

      socket.on('error', (err) => {
        console.error(
          `Error en cliente de ${config.projectName}:`,
          err.message,
        );
        this.removeClient(socket, config.projectName);
      });
    });

    server.listen(config.port, '0.0.0.0', () => {
      console.log(
        `Servidor TCP ${config.projectName} escuchando en puerto ${config.port}`,
      );
    });

    this.servers.set(config.projectName, server);
  }

  private removeClient(socket: Socket, projectName: string): void {
    const clients = this.clientsByProject.get(projectName) || [];
    this.clientsByProject.set(
      projectName,
      clients.filter((client) => client !== socket),
    );
  }

  private broadcastData(
    data: string,
    senderSocket: Socket,
    projectName: string,
  ): void {
    const clients = this.clientsByProject.get(projectName) || [];
    clients.forEach((client) => {
      if (client !== senderSocket && !client.destroyed) {
        client.write(data);
      }
    });
  }

  stopServer(): void {
    this.servers.forEach((server, projectName) => {
      const clients = this.clientsByProject.get(projectName) || [];
      clients.forEach((client) => client.destroy());
      server.close();
    });

    this.servers.clear();
    this.clientsByProject.clear();
  }
}
