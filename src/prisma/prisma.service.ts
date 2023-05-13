import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(confing: ConfigService) {
    super({
      datasources: {
        db: {
          url: confing.get('DATABASE_URL'),
        },
      },
    });
  }
}
