"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cache_service_1 = require("../../cache/cache.service");
let EmployeeService = class EmployeeService {
    constructor(employeeModel, logger, cacheService) {
        this.employeeModel = employeeModel;
        this.logger = logger;
        this.cacheService = cacheService;
    }
    async createEmployee(createEmployeeDto) {
        this.logger.log('Creating a new employee');
        try {
            const newEmployee = new this.employeeModel(createEmployeeDto);
            const result = await newEmployee.save();
            this.logger.log(`Employee ${result._id} created successfully`);
            this.cacheService.set(`employee_${result._id}`, result);
            return result;
        }
        catch (error) {
            this.logger.error('Failed to create employee', error.stack);
            throw new common_1.BadRequestException('Failed to create employee');
        }
    }
    async updateEmployee(id, updateEmployeeDto) {
        this.logger.log(`Updating employee with ID ${id}`);
        try {
            const existingEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true });
            if (!existingEmployee) {
                this.logger.warn(`Employee with ID ${id} not found for update`);
                throw new common_1.NotFoundException(`Employee #${id} not found`);
            }
            this.logger.log(`Employee ${id} updated successfully`);
            this.cacheService.set(`employee_${id}`, existingEmployee);
            return existingEmployee;
        }
        catch (error) {
            this.logger.error(`Failed to update employee with ID ${id}`, error.stack);
            throw new common_1.BadRequestException('Failed to update employee');
        }
    }
    async getAllEmployees() {
        this.logger.log('Fetching all employees');
        try {
            const cachedData = this.cacheService.get('all_employees');
            if (cachedData) {
                this.logger.log('Fetching employees from cache');
                return cachedData;
            }
            const employeeData = await this.employeeModel.find().exec();
            if (!employeeData || employeeData.length === 0) {
                this.logger.warn('No employees found');
                throw new common_1.NotFoundException('Employees data not found!');
            }
            this.logger.log('All employees data fetched successfully');
            this.cacheService.set('all_employees', employeeData);
            return employeeData;
        }
        catch (error) {
            this.logger.error('Failed to fetch all employees', error.stack);
            throw new common_1.BadRequestException('Failed to fetch employees');
        }
    }
    async getEmployee(id) {
        this.logger.log(`Fetching employee with ID ${id}`);
        try {
            const cachedData = this.cacheService.get(`employee_${id}`);
            if (cachedData) {
                this.logger.log(`Fetching employee ${id} from cache`);
                return cachedData;
            }
            const existingEmployee = await this.employeeModel.findById(id).exec();
            if (!existingEmployee) {
                this.logger.warn(`Employee with ID ${id} not found`);
                throw new common_1.NotFoundException(`Employee #${id} not found`);
            }
            this.logger.log(`Employee ${id} fetched successfully`);
            this.cacheService.set(`employee_${id}`, existingEmployee);
            return existingEmployee;
        }
        catch (error) {
            this.logger.error(`Failed to fetch employee with ID ${id}`, error.stack);
            throw new common_1.BadRequestException('Failed to fetch employee');
        }
    }
    async deleteEmployee(id) {
        this.logger.log(`Deleting employee with ID ${id}`);
        try {
            const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);
            if (!deletedEmployee) {
                this.logger.warn(`Employee with ID ${id} not found for deletion`);
                throw new common_1.NotFoundException(`Employee #${id} not found`);
            }
            this.logger.log(`Employee ${id} deleted successfully`);
            this.cacheService.del(`employee_${id}`);
            this.cacheService.del('all_employees');
            return deletedEmployee;
        }
        catch (error) {
            this.logger.error(`Failed to delete employee with ID ${id}`, error.stack);
            throw new common_1.BadRequestException('Failed to delete employee');
        }
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Employee')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        common_1.Logger,
        cache_service_1.CacheService])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map