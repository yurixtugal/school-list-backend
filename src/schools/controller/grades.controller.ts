import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateGradeDto, UpdateGradeDto } from '../dto/grade.dto';
import { CreateSchoolDto, UpdateSchoolDto } from '../dto/school.dto';
import { GradesService } from '../service/grades.service'


@Controller('grades')
export class GradesController {

    constructor(private gradeService: GradesService){}

    @Get()
    getAllGrades(){
        return this.gradeService.getAllGrades();
    }

    @Get(':id')
    getGradeById(@Param("id",ParseIntPipe) id: number){
        return this.gradeService.getGradeById(id);
    }

    @Post()
    createGrade(@Body() createGradeDTO: CreateGradeDto){
        return this.gradeService.createGrade(createGradeDTO);
    }

    @Patch(":id")
    updateGrade(@Param("id",ParseIntPipe) id: number,@Body() updateGradeDTO: UpdateGradeDto){
        return this.gradeService.updateGrade(id,updateGradeDTO);
    }

    @Delete(':id')
    deleteGrade(@Param("id",ParseIntPipe) id: number){
        return this.gradeService.deleteGrade (id);
    }

}
