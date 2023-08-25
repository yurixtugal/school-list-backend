import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entity/school.entity';
import { SchoolsController } from './controller/schools.controller';
import { SchoolsService } from './service/schools.service';
import { Grade } from './entity/grade.entity';
import { GradesService } from './service/grades.service';
import { GradesController } from './controller/grades.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([School,Grade]),ConfigModule,JwtModule,AuthModule],
  controllers: [SchoolsController, GradesController],
  providers: [SchoolsService, GradesService],
  exports: [GradesService]
})
export class SchoolsModule {}
