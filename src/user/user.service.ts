// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }
}
