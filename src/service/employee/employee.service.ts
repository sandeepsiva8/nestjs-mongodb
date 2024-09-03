// src/service/employee/employee.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
import { Employee } from 'src/interface/employee.interface';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
    @Inject(Logger) private readonly logger: Logger, // Injecting the winston logger
    private readonly cacheService: CacheService, // Injecting CacheService
  ) {}

  // Create a new employee
  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    this.logger.log('Creating a new employee');
    try {
      const newEmployee = new this.employeeModel(createEmployeeDto);
      const result = await newEmployee.save();
      this.logger.log(`Employee ${result._id} created successfully`);
      this.cacheService.set(`employee_${result._id}`, result); // Cache the new employee
      return result;
    } catch (error) {
      this.logger.error('Failed to create employee', error.stack);
      throw new BadRequestException('Failed to create employee');
    }
  }

  // Update an existing employee
  async updateEmployee(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    this.logger.log(`Updating employee with ID ${id}`);
    try {
      const existingEmployee = await this.employeeModel.findByIdAndUpdate(
        id,
        updateEmployeeDto,
        { new: true }, // Return the updated document
      );

      if (!existingEmployee) {
        this.logger.warn(`Employee with ID ${id} not found for update`);
        throw new NotFoundException(`Employee #${id} not found`);
      }

      this.logger.log(`Employee ${id} updated successfully`);
      this.cacheService.set(`employee_${id}`, existingEmployee); // Update cache
      return existingEmployee;
    } catch (error) {
      this.logger.error(`Failed to update employee with ID ${id}`, error.stack);
      throw new BadRequestException('Failed to update employee');
    }
  }

  // Get all employees
  async getAllEmployees(): Promise<Employee[]> {
    this.logger.log('Fetching all employees');
    try {
      const cachedData = this.cacheService.get<Employee[]>('all_employees');
      if (cachedData) {
        this.logger.log('Fetching employees from cache');
        return cachedData;
      }

      const employeeData = await this.employeeModel.find().exec();
      if (!employeeData || employeeData.length === 0) {
        this.logger.warn('No employees found');
        throw new NotFoundException('Employees data not found!');
      }

      this.logger.log('All employees data fetched successfully');
      this.cacheService.set('all_employees', employeeData); // Cache the data
      return employeeData;
    } catch (error) {
      this.logger.error('Failed to fetch all employees', error.stack);
      throw new BadRequestException('Failed to fetch employees');
    }
  }

  // Get a specific employee by ID
  async getEmployee(id: string): Promise<Employee> {
    this.logger.log(`Fetching employee with ID ${id}`);
    try {
      const cachedData = this.cacheService.get<Employee>(`employee_${id}`);
      if (cachedData) {
        this.logger.log(`Fetching employee ${id} from cache`);
        return cachedData;
      }

      const existingEmployee = await this.employeeModel.findById(id).exec();
      if (!existingEmployee) {
        this.logger.warn(`Employee with ID ${id} not found`);
        throw new NotFoundException(`Employee #${id} not found`);
      }

      this.logger.log(`Employee ${id} fetched successfully`);
      this.cacheService.set(`employee_${id}`, existingEmployee); // Cache the employee
      return existingEmployee;
    } catch (error) {
      this.logger.error(`Failed to fetch employee with ID ${id}`, error.stack);
      throw new BadRequestException('Failed to fetch employee');
    }
  }

  // Delete an employee
  async deleteEmployee(id: string): Promise<Employee> {
    this.logger.log(`Deleting employee with ID ${id}`);
    try {
      const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);
      if (!deletedEmployee) {
        this.logger.warn(`Employee with ID ${id} not found for deletion`);
        throw new NotFoundException(`Employee #${id} not found`);
      }
      this.logger.log(`Employee ${id} deleted successfully`);
      this.cacheService.del(`employee_${id}`); // Remove from cache
      this.cacheService.del('all_employees'); // Clear the list cache as well
      return deletedEmployee;
    } catch (error) {
      this.logger.error(`Failed to delete employee with ID ${id}`, error.stack);
      throw new BadRequestException('Failed to delete employee');
    }
  }
}
