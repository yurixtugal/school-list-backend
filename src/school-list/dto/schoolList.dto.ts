import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEmpty, IsInt,IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

export class CreateSchoolListDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  gradeId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateProductSchooListDto)
  @ApiProperty()
  lstProductSchool: CreateProductSchooListDto[]

  @IsArray()
  @ValidateNested()
  @Type(() => CreateCategorySchooListDto)
  @ApiProperty()
  @ArrayNotEmpty()
  lstCategorySchool?: CreateCategorySchooListDto[]
}

export class UpdateSchoolListDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name?: string;
    @IsString()
    @ApiProperty()
    description?: string;
    @IsInt()
    @ApiProperty()
    gradeId?: number;
    @IsArray()
    @ValidateNested()
    @ApiProperty()
    lstProductSchool?: CreateProductSchooListDto[]
    @IsArray()
    @ValidateNested()
    @ApiProperty()
    lstCategorySchool?: CreateCategorySchooListDto[]
  }


export class CreateProductSchooListDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  schoolListId?: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
}

export class CreateCategorySchooListDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  schoolListId?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsArray()
  @ValidateNested()
  @ApiProperty()
  @Type(() => CreateDetailCategoryProductDto)
  @ArrayNotEmpty()
  lstDetailCategoryProduct?: CreateDetailCategoryProductDto[]
}

export class CreateDetailCategoryProductDto {
  @IsInt()
  @IsOptional() 
  @ApiProperty()
  categorySchoolListId?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nameProduct: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

}



export class SchoolListEstimatedDto {
  @ApiProperty()
  products: DetailSchoolListEstimatedDto[]
}

export class DetailSchoolListEstimatedDto {
  @IsString()
  @ApiProperty()
  productName: string;

  @IsInt()
  @ApiProperty()
  quantity: number;
}

/*
export class UpdateBrandDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;
}*/