import { Module } from '@nestjs/common';
import { LandingService } from './landing.service';
import { LandingController } from './landing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Landing, LandingSchema } from './schemas/landing.schema';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Landing.name, schema: LandingSchema }
    ]),
    AiModule
  ],
  providers: [LandingService],
  controllers: [LandingController]
})
export class LandingModule {}
