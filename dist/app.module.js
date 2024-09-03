"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const employee_controller_1 = require("./controller/employee/employee.controller");
const employee_service_1 = require("./service/employee/employee.service");
const employee_schema_1 = require("./schema/employee.schema");
const logger_module_1 = require("./logger/logger.module");
const cache_service_1 = require("./cache/cache.service");
const rate_limit_service_1 = require("./cache/rate-limit.service");
const rate_limit_middleware_1 = require("./middleware/rate-limit.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(rate_limit_middleware_1.RateLimitMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                    dbName: configService.get('MONGODB_DB_NAME'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Employee', schema: employee_schema_1.EmployeeSchema }]),
            logger_module_1.LoggerModule,
        ],
        controllers: [employee_controller_1.EmployeeController],
        providers: [
            employee_service_1.EmployeeService,
            cache_service_1.CacheService,
            rate_limit_service_1.RateLimitService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map