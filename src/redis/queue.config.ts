import { connections } from 'src/config/connections.config';

export interface QueuePair {
  queue1: string;
  queue2: string;
  processingFlag: string;
}

export class QueueConfig {
  private static getQueueNames(projectName: string): QueuePair {
    return {
      queue1: `${projectName}_queue1`,
      queue2: `${projectName}_queue2`,
      processingFlag: `${projectName}_processingFlag`,
    };
  }

  public static getQueuesConfig(): Record<string, QueuePair> {
    const queuesConfig: Record<string, QueuePair> = {};

    connections.forEach((connection) => {
      queuesConfig[connection.projectName] = this.getQueueNames(
        connection.projectName,
      );
    });

    return queuesConfig;
  }
}
