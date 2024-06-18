import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { V1Module } from './versions/v1/v1.module';
import { DatabaseModule } from './config/db/datatabase.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    V1Module,
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
