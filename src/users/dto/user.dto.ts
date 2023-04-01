import { ApiProperty } from '@nestjs/swagger';
import { isDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string;
    @IsString()
    @IsOptional()
    @ApiProperty()
    lastName?: string;
}