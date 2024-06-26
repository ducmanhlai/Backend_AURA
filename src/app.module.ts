import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database.module';
@Module({
  imports: [DatabaseModule,AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
