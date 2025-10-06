import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await this.$connect();
    } catch (error) {
      console.error('Database connection failed', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await this.$disconnect();
    } catch (error) {
      console.error('Database disconnection failed', error);
    }
  }
}
