import { Document } from 'mongoose';

export interface Employee extends Document {
  readonly employeeId: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly dob: string;

  readonly gender: string;

  readonly education: string;

  readonly company: string;

  readonly experience: number;

  readonly salary: number;
}
