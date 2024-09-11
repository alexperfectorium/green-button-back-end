import { Module } from '@nestjs/common';
import { LendingService } from './lending.service';
import { LendingController } from './lending.controller';

@Module({
  providers: [LendingService],
  controllers: [LendingController]
})
export class LendingModule {}
