import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { EmailService } from 'src/email/email.service';
import { ConfirmCodeDto } from './dtos/confirmcode.dto';
import { ResetPasswordDto } from './dtos/resetpassword.dto';
import { ResponseClass } from 'src/factory/response';
import { ErrorHandler } from 'src/factory/errorHandler';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {}
  savetokenpass = '';

  // Response class Object
  response = new ResponseClass();
  errorHandler = new ErrorHandler();

  // Sign up new User
  async signup(signupDto: any) {
    try {
      console.log(signupDto);
      // check if passwords match
      if (signupDto.password !== signupDto.passwordConfirm)
        throw this.errorHandler.createError('Passwords does not match!', 400);

      delete signupDto.passwordConfirm;

      //   Hashing the password
      signupDto.password = await bcrypt.hash(signupDto.password, 10);

      //   Create new user in resetPasswordbase
      const newUser = await this.prisma.user.create({
        data: { ...signupDto },
      });

      delete newUser.password;

      await this.emailService.sendEmail(
        newUser.email,
        'Education Platform',
        `Welcome to this platform, please login: http://localhost:3000/auth/signin`,
      );

      return newUser;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002')
          throw this.errorHandler.createError(
            'This user is already exists.',
            403,
          );
      }
      throw err;
    }
  }

  //   sign in with an existing user
  async signin(signinDto: any) {
    try {
      // Get user by email
      const user = await this.prisma.user.findUnique({
        where: { email: signinDto.email },
      });

      //   Check if user exists with provided  email
      if (!user) this.errorHandler.createError('Wrong Email or Password!', 404);

      //   Check if provided email & password are a match
      const passCheck = await bcrypt.compare(signinDto.password, user.password);
      if (!passCheck)
        throw this.errorHandler.createError('Wrong Email or Password!', 404);

      const jwt = await this.signToken(user.id, user.email);

      await this.prisma.user.updateMany({
        where: { email: signinDto.email },
        data: {
          jwt,
        },
      });

      return { message: 'Logged In Successfully.', jwt };
    } catch (err) {
      throw err;
    }
  }

  // Forget password logic
  async forgetPassword(forgetPasswordDto: any) {
    try {
      // Find a user by email
      const checkUser = await this.prisma.user.findUnique({
        where: {
          email: forgetPasswordDto.email,
        },
      });

      // Check if user exists
      if (!checkUser) throw this.errorHandler.createError('Wrong Email!', 404);

      // Create reset code, encrypt it, then store it in db
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      // console.log(resetCode);
      const token = await this.encrypt(
        resetCode,
        this.config.get('ENCRYPT_CODE_PASS'),
      );

      const date = Date.now() + 10 * 60 * 1000;

      // save encrypted code in db
      const user = await this.prisma.user.update({
        where: {
          email: forgetPasswordDto.email,
        },

        data: {
          resetPasswordToken: token,
          resetExpiresTime: new Date(date),
        },
      });

      // Sending mail with reset code
      const testMsg = `this is reste code ${resetCode}`;
      await this.emailService.sendEmail(
        user.email,
        'Education-Platform Password Reset Code',
        testMsg,
      );

      return { message: `check code in your email: ${user.email}` };
    } catch (err) {
      throw err;
    }
  }

  // Confirm Code validating
  async confirmCode(data: ConfirmCodeDto) {
    try {
      // Encrypt the user's entered code to compare it with the code in db
      const hashedToken = await this.encrypt(
        data.code,
        this.config.get('ENCRYPT_CODE_PASS'),
      );

      // Get user with the reset code
      const user = await this.prisma.user.findFirst({
        where: {
          resetPasswordToken: hashedToken,
        },
      });

      if (!user) throw this.errorHandler.createError(' wrong code', 500);

      this.savetokenpass = user.resetPasswordToken;

      const date = Date.now();
      if (user.resetExpiresTime < new Date(date))
        throw this.errorHandler.createError(
          'The code has expierd try agin',
          400,
        );

      return { message: 'success' };
    } catch (err) {
      throw err;
    }
  }

  // Resetting the password
  async resetPassword(resetPassword: ResetPasswordDto) {
    try {
      if (resetPassword.newPassword != resetPassword.newPasswordConfirm)
        throw this.errorHandler.createError('password not match', 400);

      const hashedPassword = await bcrypt.hash(resetPassword.newPassword, 10);

      // const user = await this.prisma.user.findFirst({
      //   where: {
      //     resetPasswordToken: this.savetokenpass,
      //   },
      // });

      await this.prisma.user.updateMany({
        where: {
          resetPasswordToken: this.savetokenpass,
        },
        data: {
          password: hashedPassword,
          resetPasswordToken: null,
          resetExpiresTime: null,
        },
      });
      this.savetokenpass = null;

      return { message: 'Password reseted successfully.' };
    } catch (err) {
      throw err;
    }
  }

  // create jwt
  async signToken(userId: string, email: string) {
    const payload = {
      userId,
      email,
    };

    const jwt = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRES_IN'),
    });

    return jwt;
  }

  // encryption functoin
  async encrypt(text: string, secretKey: string) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    // console.log('e' + encrypted);
    return encrypted;
  }

  // Assign new admin
  async assignAdmin(id: string) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          role: 'admin',
        },
      });

      return this.response.sendResponse(
        `${user.fname + user.lname} is admin now.`,
      );
    } catch (err) {
      throw err;
    }
  }
}
