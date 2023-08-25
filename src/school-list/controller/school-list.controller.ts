import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CreateSchoolListDto, SchoolListEstimatedDto } from '../dto/schoolList.dto';
import { SchoolListService } from '../service/school-list.service';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

@Controller('school-list')
export class SchoolListController {
    
    constructor(private schoolListService: SchoolListService){}

    @Get()
    getAllSchoolList(){
        return this.schoolListService.getAllSchoolList();
    }

    @Get("schoolListByGrade/:idGrade")
    getSchoolListByGradeId(@Param("idGrade", ParseIntPipe) idGrade: number){
        return this.schoolListService.getSchoolListByIdGrade(idGrade)
    }

    @Get(":id")
    getSchoolListById(@Param("id", ParseIntPipe) id: number){
        return this.schoolListService.getSchoolListById(id)
    }

    @UseGuards(ApiKeyGuard)
    @Post()
    createSchoolList(@Body() createSchoolListDto: CreateSchoolListDto){
        return this.schoolListService.createSchoolList(createSchoolListDto)
    }
    @UseGuards(ApiKeyGuard)
    @Post("EstimateSchoolList")
    estimateSchoolList(@Body() schoolListEstimated: SchoolListEstimatedDto){
        return this.schoolListService.getSchoolListEstimated(schoolListEstimated)
    }



}
