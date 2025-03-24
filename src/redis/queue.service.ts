import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from './redis.service';
import { MysqlService } from './mysql.service';
import { QueueConfig, QueuePair } from './queue.config';

@Injectable()
export class QueueService implements OnModuleInit {
  private queuesConfig: Record<string, QueuePair>;

  constructor(
    private readonly redisService: RedisService,
    private readonly mysqlService: MysqlService,
  ) {
    this.queuesConfig = QueueConfig.getQueuesConfig();
  }

  onModuleInit() {
    Object.keys(this.queuesConfig).forEach((projectName) => {
      this.startProcessingQueue2(projectName);
    });
  }

  async startProcessingQueue2(projectName: string) {
    console.log(`Iniciando el procesamiento de queue2 para ${projectName}...`);
    await this.processQueue2(projectName);
  }

  async enqueueData(data: string[], projectName: string) {
    const queues = this.queuesConfig[projectName];
    for (const item of data) {
      await this.redisService.pushToQueue(queues.queue1, item);
      await this.processQueue1(projectName);
    }
  }

  async processQueue1(projectName: string) {
    const queues = this.queuesConfig[projectName];
    const data = await this.redisService.popFromQueue(queues.queue1);
    if (data) {
      const processingQueue2 = await this.redisService.getProcessingFlag(
        queues.processingFlag,
      );
      if (processingQueue2 !== 'true') {
        await this.redisService.pushToQueue(queues.queue2, data);
        const queueLength = Number(
          await this.redisService.getQueueLength(queues.queue2),
        );
        console.log(
          '\x1b[35m%s\x1b[0m',
          `Queue 2a [${projectName}]: ${queueLength}`,
        );
      }
    }
  }

  async processQueue2(projectName: string) {
    const queues = this.queuesConfig[projectName];
    while (true) {
      const queueLength = Number(
        await this.redisService.getQueueLength(queues.queue2),
      );
      console.log(
        '\x1b[34m%s\x1b[0m',
        `Queue 2b [${projectName}]: ${queueLength}`,
      );

      if (queueLength >= 100) {
        console.log(
          '\x1b[33m%s\x1b[0m',
          `Queue 2 with 100 elements for ${projectName}, Process...`,
        );
        await this.redisService.setProcessingFlag(
          queues.processingFlag,
          'true',
        );

        const dataToInsert = [];
        for (let i = 0; i < 100; i++) {
          const data = await this.redisService.popFromQueue(queues.queue2);
          if (data) {
            dataToInsert.push(data);
          }
        }

        await this.mysqlService.insertData(dataToInsert, projectName);
        console.log(
          '\x1b[36m%s\x1b[0m',
          `Info sent to DB for ${projectName}!!`,
        );

        await this.redisService.setProcessingFlag(
          queues.processingFlag,
          'false',
        );
        console.log(
          '\x1b[33m%s\x1b[0m',
          `Process flag to false for ${projectName}`,
        );

        await this.restoreQueue1(projectName);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  private async restoreQueue1(projectName: string) {
    const queues = this.queuesConfig[projectName];
    while (true) {
      const data = await this.redisService.popFromQueue(queues.queue1);
      if (!data) {
        console.log(
          '\x1b[33m%s\x1b[0m',
          `No more data in Queue 1 to move to Queue 2 for ${projectName}`,
        );
        break;
      }
      await this.redisService.pushToQueue(queues.queue2, data);
      const queueLength = Number(
        await this.redisService.getQueueLength(queues.queue2),
      );
      console.log(
        '\x1b[33m%s\x1b[0m',
        `Data restored from queue 1 to queue 2 for ${projectName}: ${data}`,
      );
      console.log(
        `Current queue 2 size after restore for ${projectName}: ${queueLength}`,
      );
    }
  }
}
