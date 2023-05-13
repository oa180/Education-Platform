import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { UpdateSubjectDto } from './dtos/update-subject.dto';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  //   Create New Subject
  @Post()
  createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.createSubject(createSubjectDto);
  }

  //   Update Subject
  @Patch()
  updateSubject(
    @Body() updateSubjectDto: UpdateSubjectDto,
    @Param('lId') lId: string,
  ) {
    return this.subjectService.updateSubject(updateSubjectDto, lId);
  }

  //   Update Subject
  @Get()
  getAllSubjects() {
    return this.subjectService.getAllSubjects();
  }
  //   Update Subject
  @Get(':lId')
  getOneSubject(@Param('lId') lId: string) {
    return this.subjectService.getOneSubject(lId);
  }
  //   Update Subject
  @Delete('lId')
  deleteSubject(@Param('lId') lId: string) {
    return this.subjectService.deleteSubject(lId);
  }
}
