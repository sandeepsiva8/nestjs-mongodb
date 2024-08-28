import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
import { EmployeeService } from 'src/service/employee/employee.service';

@Controller('employee')
export class employeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(
    @Res() response,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    try {
      const newEmployee = await this.employeeService.createEmployee(
        createEmployeeDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Employee has been created successfully',
        newEmployee,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Employee not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateEmployee(
    @Res() response,
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const existingEmployee = await this.employeeService.updateEmployee(
        id,
        updateEmployeeDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Employee has been successfully updated',
        existingEmployee,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Employee not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getEmployees(@Res() response) {
    try {
      const employeeData = await this.employeeService.getAllEmployees();
      return response.status(HttpStatus.OK).json({
        message: 'All Employee data found successfully',
        employeeData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getEmployee(@Res() response, @Param('id') id: string) {
    try {
      const existingEmployee = await this.employeeService.getEmployee(id);
      return response.status(HttpStatus.OK).json({
        message: 'Employee found successfully',
        existingEmployee,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteEmployee(@Res() response, @Param('id') id: string) {
    try {
      const deletedEmployee = await this.employeeService.deleteEmployee(id);
      return response.status(HttpStatus.OK).json({
        message: 'Employee deleted successfully',
        deletedEmployee,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
