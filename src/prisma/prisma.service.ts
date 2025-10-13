import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.error('Database connection failed', error);
      throw error;
    }
  }

  async onApplicationShutdown() {
    try {
      await this.$disconnect();
    } catch (error) {
      console.error('Database disconnection failed', error);
    }
  }
}
