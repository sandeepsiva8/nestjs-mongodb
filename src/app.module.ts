import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './controller/employee/employee.controller';
import { EmployeeSchema } from './schema/employee.schema';
import { EmployeeService } from './service/employee/employee.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { CacheService } from './cache/cache.service';
import { RateLimitService } from './cache/rate-limit.service';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env file globally
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DB_NAME'),
      }),
    }),
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
    AuthModule,
    LoggerModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, CacheService, RateLimitService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes('*'); // Apply rate limit middleware to all routes
  }
}
