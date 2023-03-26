import { isDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
}

export class UpdateBrandDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;
}