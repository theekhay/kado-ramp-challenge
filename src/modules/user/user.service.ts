import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { mailTemplates } from 'src/definitions/constants';
// import NotificationService from 'src/microservices/notification.service';

import * as _ from 'lodash';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(payload: CreateUserDTO): Promise<UserDocument> {
    const user = new this.userModel(payload);
    await user.save();
    return user;
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({
      email: email,
    });
  }

  async getUserById(id: any): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id });
  }
}
