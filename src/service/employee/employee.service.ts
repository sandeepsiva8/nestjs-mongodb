import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { Employee } from 'src/interface/employee.interface';
import { Model } from 'mongoose';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private employeeModel: Model<Employee>,
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const newEmployee = await new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  async updateEmployee(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const existingEmployee = await this.employeeModel.findByIdAndUpdate(
      id,
      updateEmployeeDto,
    );
    if (!existingEmployee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return existingEmployee;
  }

  async getAllEmployees(): Promise<Employee[]> {
    const employeeData = await this.employeeModel.find();
    if (!employeeData || employeeData.length == 0) {
      throw new NotFoundException('Employees data not found!');
    }
    return employeeData;
  }

  async getEmployee(id: string): Promise<Employee> {
    const existingEmployee = await this.employeeModel.findById(id).exec();
    if (!existingEmployee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return existingEmployee;
  }

  async deleteEmployee(id: string): Promise<Employee> {
    const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return deletedEmployee;
  }
}
