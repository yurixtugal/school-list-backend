import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateSchoolListDto } from '../dto/schoolList.dto';
import { SchoolListService } from '../service/school-list.service';

@Controller('school-list')
export class SchoolListController {
    
    constructor(private schoolListService: SchoolListService){}

    @Get()
    getAllSchoolList(){
        return this.schoolListService.getAllSchoolList();
    }

    @Get(":id")
    getSchoolListById(@Param("id", ParseIntPipe) id: number){
        return this.schoolListService.getSchoolListById(id)
    }

    @Post()
    createSchoolList(@Body() createSchoolListDto: CreateSchoolListDto){
        return this.schoolListService.createSchoolList(createSchoolListDto)
    }

}
