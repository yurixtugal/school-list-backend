import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BrandsService } from '../service/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

@Controller('brands')
export class BrandsController {

    constructor(private brandService: BrandsService){}

    @UseGuards(ApiKeyGuard)
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


    @UseGuards(ApiKeyGuard)
    @Delete(':id')
    deleteBrand(@Param('id', ParseIntPipe) id: number){
        return this.brandService.deleteBrand(id);
    }


    @UseGuards(ApiKeyGuard)
    @Patch(':id')
    updateBrand(@Param('id', ParseIntPipe) id: number,@Body() updateBrandDto: UpdateBrandDto){
        return this.brandService.updateBrand(id,updateBrandDto);
    }

}
