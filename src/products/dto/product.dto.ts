import { isDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNumber()
  brandId: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;
  @IsNumber()
  @IsOptional()
  brandId?: number;
}