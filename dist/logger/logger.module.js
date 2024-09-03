"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
let LoggerModule = class LoggerModule {
};
LoggerModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: common_1.Logger,
                useFactory: () => {
                    return nest_winston_1.WinstonModule.createLogger({
                        transports: [
                            new winston.transports.Console({
                                format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.printf(({ timestamp, level, message }) => {
                                    return `${timestamp} [${level}] ${message}`;
                                })),
                            }),
                        ],
                    });
                },
            },
        ],
        exports: [common_1.Logger],
    })
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=logger.module.js.map