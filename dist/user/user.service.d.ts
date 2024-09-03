import { Model } from 'mongoose';
import { User } from './user.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findOne(username: string): Promise<User | undefined>;
}
