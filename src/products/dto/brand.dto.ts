import { ApiProperty } from '@nestjs/swagger';
import { isDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  description: string;
}

export class UpdateBrandDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;
}