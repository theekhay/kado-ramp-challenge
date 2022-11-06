import * as _ from 'lodash';
import * as faker from 'faker';
import { ObjectId } from 'mongodb';
import { UserDocument } from '../../modules/user/user.schema';
import { CreateUserDTO } from '../../modules/user/dto/create-user.dto';

const getCreateUserDTO = (
  overrides?: Partial<CreateUserDTO>,
): CreateUserDTO => {
  const userObj = _.cloneDeep(overrides || {});

  return _.defaults<Partial<CreateUserDTO>, CreateUserDTO>(userObj, {
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    password: faker.internet.password(),
  });
};

const getUser = (overrides?: Partial<UserDocument>): Partial<UserDocument> => {
  const userObj = _.cloneDeep(overrides || {});

  return _.defaults<Partial<UserDocument>, Partial<UserDocument>>(userObj, {
    _id: new ObjectId(),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    password: faker.internet.password(),
  });
};

export { getUser, getCreateUserDTO };
