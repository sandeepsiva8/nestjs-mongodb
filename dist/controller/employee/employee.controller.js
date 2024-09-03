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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const create_employee_dto_1 = require("../../dto/create-employee.dto");
const update_employee_dto_1 = require("../../dto/update-employee.dto");
const employee_service_1 = require("../../service/employee/employee.service");
let EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async createEmployee(response, createEmployeeDto) {
        try {
            const newEmployee = await this.employeeService.createEmployee(createEmployeeDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: 'Employee has been created successfully',
                newEmployee,
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Employee not created!',
                error: 'Bad Request',
            });
        }
    }
    async updateEmployee(response, id, updateEmployeeDto) {
        try {
            const existingEmployee = await this.employeeService.updateEmployee(id, updateEmployeeDto);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Employee has been successfully updated',
                existingEmployee,
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Employee not updated!',
                error: 'Bad Request',
            });
        }
    }
    async getEmployees(response) {
        try {
            const employeeData = await this.employeeService.getAllEmployees();
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All Employee data found successfully',
                employeeData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getEmployee(response, id) {
        try {
            const existingEmployee = await this.employeeService.getEmployee(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Employee found successfully',
                existingEmployee,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deleteEmployee(response, id) {
        try {
            const deletedEmployee = await this.employeeService.deleteEmployee(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Employee deleted successfully',
                deletedEmployee,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployees", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployee", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmployee", null);
EmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map