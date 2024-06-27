import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: 6543,
      username: process.env.user,
      password: process.env.password,
      database: process.env.database,
      synchronize: false,
    }),
  ],
})


export class DatabaseModule {}
