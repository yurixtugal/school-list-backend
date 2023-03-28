import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  description: string;
  @IsString()
  @ApiProperty()
  address: string; 
}
export class UpdateSchoolDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name?: string;
  @IsString()
  @ApiProperty()
  description?: string;
  @IsString()
  @ApiProperty()
  address?: string;
}