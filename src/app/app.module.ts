import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaunadbModule } from '../faunadb';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FaunadbModule.forRoot({ secret: process.env.FAUNADB_SECRET }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
