import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DataService } from '../tcp/data.service';
import { QueueService } from '../redis/queue.service';

interface DataRequest {
  data: string;
  projectName: string;
}

interface DataResponse {
  status: string;
  message: string;
  processedData: string;
}

@Controller()
export class GrpcController {
  constructor(
    private readonly dataService: DataService,
    private readonly queueService: QueueService,
  ) {}

  @GrpcMethod('ChromaloggerService', 'ProcessData')
  async processData(data: DataRequest): Promise<DataResponse> {
    try {
      const processedData = this.dataService.processData(data.data);
      const serializedData = JSON.stringify(processedData);

      await this.queueService.enqueueData([serializedData], data.projectName);

      return {
        status: 'success',
        message: 'Data processed successfully',
        processedData: serializedData,
      };
    } catch (error) {
      console.error(`Error processing data: ${error.message}`);
      return {
        status: 'error',
        message: error.message,
        processedData: '',
      };
    }
  }
}
