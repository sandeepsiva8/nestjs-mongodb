// src/dto/create-employee.dto.ts
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  readonly employeeId: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly dob: string;

  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @IsString()
  @IsNotEmpty()
  readonly education: string;

  @IsString()
  @IsNotEmpty()
  readonly company: string;

  @IsNumber()
  @IsNotEmpty()
  readonly experience: number;

  @IsNumber()
  @IsNotEmpty()
  readonly salary: number;
}
