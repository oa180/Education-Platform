import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}
  // Classes Instances
  crud = new CRUD();

  //   Create New Quiz
  async createQuiz(createQuizDto: any) {
    return await this.crud.create(this.prisma.quiz, createQuizDto);
  }

  //   Update Quiz
  async updateQuiz(updateQuizDto: any, lId: any) {
    return await this.crud.update(this.prisma.quiz, lId, updateQuizDto);
  }

  //   Get All Quizs
  async getAllQuizs() {
    return await this.crud.findAll(this.prisma.quiz);
  }
  //   Get One Quizccccc
  async getOneQuiz(lId: any) {
    return await this.prisma.quiz.findUnique({
      where: {
        id: lId,
      },
      include: { questions: true, _count: { select: { questions: true } } },
    });
  }
  //   Delete one Quiz
  async deleteQuiz(lId: any) {
    return this.crud.delete(this.prisma.quiz, lId);
  }
}
