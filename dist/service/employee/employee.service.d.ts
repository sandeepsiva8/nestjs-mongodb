import { CreateEmployeeDto } from 'src/dto/create-employee.dto';
import { Employee } from 'src/interface/employee.interface';
import { Model } from 'mongoose';
import { UpdateEmployeeDto } from 'src/dto/update-employee.dto';
export declare class EmployeeService {
    private employeeModel;
    constructor(employeeModel: Model<Employee>);
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    getAllEmployees(): Promise<Employee[]>;
    getEmployee(id: string): Promise<Employee>;
    deleteEmployee(id: string): Promise<Employee>;
}
