import { ApiProperty } from '@nestjs/swagger';
import { isDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  description: string;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;
  @IsNumber()
  @ApiProperty()
  brandId: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  price?: number;
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  brandId?: number;
}