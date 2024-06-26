import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: 6543,
      username: process.env.user,
      password: process.env.password,
      database: process.env.database,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
