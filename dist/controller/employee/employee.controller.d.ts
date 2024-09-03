import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
import { EmployeeService } from 'src/service/employee/employee.service';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    createEmployee(response: any, createEmployeeDto: CreateEmployeeDto): Promise<any>;
    updateEmployee(response: any, id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<any>;
    getEmployees(response: any): Promise<any>;
    getEmployee(response: any, id: string): Promise<any>;
    deleteEmployee(response: any, id: string): Promise<any>;
}
