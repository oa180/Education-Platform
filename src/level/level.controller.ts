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

import { LevelService } from './level.service';
import { CreateLevelDto } from './dtos/create-level.dto';
import { UpdateLevelDto } from './dtos/update-level.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}

  //   Create New Level
  @Post()
  createLevel(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.createLevel(createLevelDto);
  }

  //   Update Level
  @Patch()
  updateLevel(
    @Body() updateLevelDto: UpdateLevelDto,
    @Param('lId') lId: string,
  ) {
    return this.levelService.updateLevel(updateLevelDto, lId);
  }

  //   Update Level
  @Get()
  getAllLevels() {
    return this.levelService.getAllLevels();
  }
  //   Update Level
  @Get(':lId')
  getOneLevel(@Param('lId') lId: string) {
    return this.levelService.getOneLevel(lId);
  }
  //   Update Level
  @Delete('lId')
  deleteLevel(@Param('lId') lId: string) {
    return this.levelService.deleteLevel(lId);
  }
}
