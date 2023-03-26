import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  @IsString()
  address: string; 
}
export class UpdateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
  @IsString()
  description?: string;
  @IsString()
  address?: string;
}