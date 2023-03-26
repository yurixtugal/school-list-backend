import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BrandsService } from '../service/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';

@Controller('brands')
export class BrandsController {

    constructor(private brandService: BrandsService){}

    @Post()
    createBrand(@Body() createBrandDto: CreateBrandDto){
        return this.brandService.createBrand(createBrandDto)
    }

    @Get()
    getBrands(){
        return this.brandService.getAllBrands();
    }

    @Get(':id')
    getBrandById(@Param('id', ParseIntPipe) id: number){
        return this.brandService.getBrandById(id);
    }

    @Delete(':id')
    deleteBrand(@Param('id', ParseIntPipe) id: number){
        return this.brandService.deleteBrand(id);
    }

    @Patch(':id')
    updateBrand(@Param('id', ParseIntPipe) id: number,@Body() updateBrandDto: UpdateBrandDto){
        return this.brandService.updateBrand(id,updateBrandDto);
    }

}
