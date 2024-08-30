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
let EmployeeService = class EmployeeService {
    constructor(employeeModel) {
        this.employeeModel = employeeModel;
    }
    async createEmployee(createEmployeeDto) {
        const newEmployee = await new this.employeeModel(createEmployeeDto);
        return newEmployee.save();
    }
    async updateEmployee(id, updateEmployeeDto) {
        const existingEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto);
        if (!existingEmployee) {
            throw new common_1.NotFoundException(`Employee #${id} not found`);
        }
        return existingEmployee;
    }
    async getAllEmployees() {
        const employeeData = await this.employeeModel.find();
        if (!employeeData || employeeData.length == 0) {
            throw new common_1.NotFoundException('Employees data not found!');
        }
        return employeeData;
    }
    async getEmployee(id) {
        const existingEmployee = await this.employeeModel.findById(id).exec();
        if (!existingEmployee) {
            throw new common_1.NotFoundException(`Employee #${id} not found`);
        }
        return existingEmployee;
    }
    async deleteEmployee(id) {
        const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);
        if (!deletedEmployee) {
            throw new common_1.NotFoundException(`Employee #${id} not found`);
        }
        return deletedEmployee;
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Employee')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map