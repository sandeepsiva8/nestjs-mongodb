/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
export declare class Employee {
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    education: string;
    company: string;
    experience: number;
    salary: number;
}
export declare const EmployeeSchema: import("mongoose").Schema<import("mongoose").Document<Employee, any, any>, import("mongoose").Model<import("mongoose").Document<Employee, any, any>, any, any, any>, {}, {}>;
