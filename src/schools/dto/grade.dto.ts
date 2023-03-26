import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateGradeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  section: string;
  @IsInt()
  @IsNotEmpty()
  schoolId: number; 
  @IsInt()
  @IsNotEmpty()
  year: number;
}
export class UpdateGradeDto {
  @IsString()
  name?: string;
  @IsString()
  section?: string;
  @IsInt()
  schoolId?: number; 
  @IsInt()
  year?: number;
}