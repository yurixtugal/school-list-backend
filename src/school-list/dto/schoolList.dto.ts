import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEmpty, IsInt,IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

export class CreateSchoolListDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  gradeId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateProductSchooListDto)
  lstProductSchool: CreateProductSchooListDto[]
}

export class UpdateSchoolListDto {
    @IsString()
    @IsNotEmpty()
    name?: string;
    @IsString()
    description?: string;
    @IsInt()
    gradeId?: number;
    @IsArray()
    @ValidateNested()
    lstProductSchool?: CreateProductSchooListDto[]
  }


export class CreateProductSchooListDto {
  @IsInt()
  @IsOptional()
  schoolListId?: number;

  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsNotEmpty()
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