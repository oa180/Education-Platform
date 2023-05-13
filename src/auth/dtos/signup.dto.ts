import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { GovEnum } from 'src/factory/enums/gov.enum';
import { RolesEnum } from 'src/factory/enums/roles.enum';

export class SignupDto {
  @IsString()
  fname: string;

  @IsString()
  lname: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('EG')
  phone: string;

  @IsOptional()
  @IsPhoneNumber('EG')
  parentPhone: string;

  @IsEnum(GovEnum)
  Gov: string;

  @IsString()
  level: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirm: string;
}
