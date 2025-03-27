import { Module } from '@nestjs/common';
import { GrpcController } from './grpc.controller';
import { TcpModule } from '../tcp/tcp.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [TcpModule, RedisModule],
  controllers: [GrpcController],
})
export class GrpcModule {}
