import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
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
  @MaxLength(30)
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly dob: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly gender: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly education: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly company: string;

  @IsNumber()
  @IsNotEmpty()
  readonly experience: string;

  @IsNumber()
  @IsNotEmpty()
  readonly salary: string;
}
