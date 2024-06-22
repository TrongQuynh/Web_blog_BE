import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { V1Module } from './versions/v1/v1.module';
import { DatabaseModule } from './config/db/datatabase.module';
import { AppController } from './app.controller';
import { RedisModule } from './config/redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    RedisModule,
    V1Module,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
