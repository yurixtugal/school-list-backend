import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateSchoolDto, UpdateSchoolDto } from '../dto/school.dto';
import { SchoolsService } from '../service/schools.service'


@Controller('schools')
export class SchoolsController {

    constructor(private schoolService: SchoolsService){}

    @Get()
    getAllSchools(){
        return this.schoolService.getAllSchools();
    }

    @Get(':id')
    getSchoolById(@Param("id",ParseIntPipe) id: number){
        return this.schoolService.getSchoolById(id);
    }

    @Post()
    createSchool(@Body() createSchoolDTO: CreateSchoolDto){
        return this.schoolService.createSchool(createSchoolDTO);
    }

    @Patch(":id")
    updateSchool(@Param("id",ParseIntPipe) id: number,@Body() updateSchoolDTO: UpdateSchoolDto){
        return this.schoolService.updateSchool(id,updateSchoolDTO);
    }

    @Delete(':id')
    deleteSchool(@Param("id",ParseIntPipe) id: number){
        return this.schoolService.deleteSchool (id);
    }

}
