import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeController } from './controller/employee/employee.controller';
import { EmployeeSchema } from './schema/employee.schema';
import { EmployeeService } from './service/employee/employee.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'employeedb',
    }),
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  ],
  controllers: [employeeController],
  providers: [EmployeeService],
})
export class AppModule {}
