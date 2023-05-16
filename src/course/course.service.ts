import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CRUD } from 'src/factory/crud.factory';
import { ErrorHandler } from 'src/factory/errorHandler';
import { ResponseClass } from 'src/factory/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dtos/create-course.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(
  'sk_test_51MoELVIKyDCqLTCrTSGScHAnyU4bkNNxZq6eJJky0t5Uem7zz6uhtjMrS1R3Gw75x2zzYymXFX9WwvyckNKqNGgm00aKssCNvV',
);
// import stripe from 'stripe';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  // Classes Instances
  crud = new CRUD();
  error = new ErrorHandler();
  response = new ResponseClass();

  //   Create New Course
  async createCourse(createCourseDto: any) {
    await this.crud.findOne(this.prisma.level, createCourseDto.levelId);

    return await this.crud.create(this.prisma.course, createCourseDto);
  }

  //   Update Course
  async updateCourse(updateCourseDto: any, lId: any) {
    return await this.crud.update(this.prisma.course, lId, updateCourseDto);
  }

  //   Get All Courses
  async getAllCourses() {
    return await this.crud.findAll(this.prisma.course);
  }

  //   Get One Courseccccc
  async getOneCourse(lId: any) {
    return await this.crud.findOne(this.prisma.course, lId);
  }

  //   Delete one Course
  async deleteCourse(lId: any) {
    return this.crud.delete(this.prisma.course, lId);
  }
  async PayCourse(courseId: string) {
    // Check if wrong course ID
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!course)
      throw this.error.createError(`Wrong course ID: ${course}`, 404);

    const session = await this.payByCard(course);
    if (!session) throw this.error.createError(`Payment Failed`, 400);
    return this.response.sendResponse(session.url, 200);
  }

  // Enroll in a course using course id
  async enrollCourse(courseId: any, uId: any) {
    try {
      // Enroll the user in course
      await this.prisma.userCourses.create({
        data: {
          courseId,
          userId: uId,
        },
      });

      return this.response.sendResponse('Enrolled Successfull', 200);
    } catch (error) {
      if (error.code == 'P2002')
        throw this.error.createError(
          `DB Error => Unique Constraint failed`,
          400,
        );

      throw error;
    }
  }
  async payByCard(course: any) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.courseName,
            },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],

      mode: 'payment',
      payment_intent_data: {
        setup_future_usage: 'on_session',
      },
      success_url: 'http://localhost:3000/course/enroll',
      cancel_url: `http://localhost:3000/course/${course.id}`,
    });
    // console.log(session);
    return session;
  }
}
