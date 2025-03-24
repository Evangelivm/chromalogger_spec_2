import { Controller, Get } from '@nestjs/common';
import { TcpService } from './tcp.service';
import { connections } from '../config/connections.config';

@Controller('tcp')
export class TcpController {
  constructor(private readonly tcpService: TcpService) {}

  @Get('start')
  startServer() {
    // Start all configured servers
    connections.forEach((config) => {
      this.tcpService.startServer(config);
    });
    return { message: 'TCP servers started' };
  }

  @Get('stop')
  stopServer() {
    this.tcpService.stopServer();
    return { message: 'TCP servers stopped' };
  }
}
