import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
import { Employee } from 'src/interface/employee.interface';
import { CacheService } from 'src/cache/cache.service';
export declare class EmployeeService {
    private readonly employeeModel;
    private readonly logger;
    private readonly cacheService;
    constructor(employeeModel: Model<Employee>, logger: Logger, cacheService: CacheService);
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    getAllEmployees(): Promise<Employee[]>;
    getEmployee(id: string): Promise<Employee>;
    deleteEmployee(id: string): Promise<Employee>;
}
