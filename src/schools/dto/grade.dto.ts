import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateGradeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  section: string;
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  schoolId: number; 
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  year: number;
}
export class UpdateGradeDto {
  @IsString()
  @ApiProperty()
  name?: string;
  @IsString()
  @ApiProperty()
  section?: string;
  @IsInt()
  @ApiProperty()
  schoolId?: number; 
  @IsInt()
  @ApiProperty()
  year?: number;
}