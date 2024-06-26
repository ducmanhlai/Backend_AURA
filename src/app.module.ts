import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
@Module({
  imports: [ConfigModule.forRoot(),DatabaseModule,AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
