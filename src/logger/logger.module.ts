// src/logger/logger.module.ts
import { Module, Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  providers: [
    {
      provide: Logger,
      useFactory: () => {
        return WinstonModule.createLogger({
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                  return `${timestamp} [${level}] ${message}`;
                }),
              ),
            }),
          ],
        });
      },
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
