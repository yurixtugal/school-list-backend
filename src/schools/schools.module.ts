import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entity/school.entity';
import { SchoolsController } from './controller/schools.controller';
import { SchoolsService } from './service/schools.service';
import { Grade } from './entity/grade.entity';
import { GradesService } from './service/grades.service';
import { GradesController } from './controller/grades.controller';

@Module({
  imports:[TypeOrmModule.forFeature([School,Grade])],
  controllers: [SchoolsController, GradesController],
  providers: [SchoolsService, GradesService],
  exports: [GradesService]
})
export class SchoolsModule {}
