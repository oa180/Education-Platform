import { BadRequestException, Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}
  // Classes Instances
  crud = new CRUD();

  //   Create New Quiz
  async createQuiz(createQuizDto: any) {
    try {
      return await this.crud.create(this.prisma.quiz, createQuizDto);
    } catch (error) {
      throw error;
    }
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
      include: {
        questions: true,
        _count: true,
      },
    });
  }
  //   Delete one Quiz
  async deleteQuiz(lId: any) {
    return this.crud.delete(this.prisma.quiz, lId);
  }

  async takeQuiz(lId: any) {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: {
          id: lId,
        },
        include: {
          questions: { include: { answers: true } },
        },
      });
      if (!quiz) throw new BadRequestException('not found ');
      return quiz;
    } catch (error) {
      throw error;
    }
  }

  async submitAnswers(answers: any, uId: any, queryObj: any) {
    try {
      let score = 0;

      const { qId, sId } = queryObj;

      for (const answer of answers) {
        const answerStatus = (
          await this.prisma.answers.findUnique({
            where: {
              id: answer,
            },
          })
        ).status;

        if (answerStatus) {
          score++;
        }
      }
      const quiz = await this.crud.findOne(this.prisma.quiz, qId);
      const userQuiz = await this.prisma.userQuizes.create({
        data: {
          userId: uId,
          quizId: qId,
          subjectId: sId,
          score,
        },
      });
      if (score >= quiz.grade / 2) {
        await this.prisma.userQuizes.update({
          where: {
            userId_quizId_subjectId: {
              userId: uId,
              quizId: qId,
              subjectId: sId,
            },
          },
          data: { passStatus: true },
        });
      }
      userQuiz.passStatus = true;

      return score;
    } catch (error) {
      throw error;
    }
  }
}
