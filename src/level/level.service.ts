import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}
  // Classes Instances
  crud = new CRUD();

  //   Create New Level
  async createLevel(createLevelDto: any) {
    return await this.crud.create(this.prisma.level, createLevelDto);
  }

  //   Update Level
  async updateLevel(updateLevelDto: any, lId: any) {
    return await this.crud.update(this.prisma.level, lId, updateLevelDto);
  }

  //   Get All Levels
  async getAllLevels() {
    return await this.crud.findAll(this.prisma.level);
  }
  //   Get One Levelccccc
  async getOneLevel(lId: any) {
    return await this.crud.findOne(this.prisma.level, lId);
  }
  //   Delete one Level
  async deleteLevel(lId: any) {
    return this.crud.delete(this.prisma.level, lId);
  }
}
