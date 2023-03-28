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

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateProductSchooListDto)
  @ApiProperty()
  lstProductSchool: CreateProductSchooListDto[]
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