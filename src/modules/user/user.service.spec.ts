import { ObjectId } from 'mongodb';
import { User } from './user.schema';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import MockUserModel from './__mock__/user.model.mock';
import {
  getCreateUserDTO,
  getUser,
} from '../../__mock__/factories/user.factory';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: MockUserModel },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const payload = getCreateUserDTO();
      const res = await userService.createUser(payload);
      expect(res._id).toBeDefined();
      expect(res.fullName).toBeDefined();
      expect(res.email).toBeDefined();
    });
  });

  describe('getUserByEmail', () => {
    it('should get user by email', async () => {
      const user = getUser({ email: 'example@gmail.com' });
      jest.spyOn(MockUserModel, 'findOne').mockReturnValue(user);

      const res = await userService.getUserByEmail(user.email);
      expect(res._id).toBeDefined();
      expect(res.email).toBe('example@gmail.com');
    });
  });

  describe('getUserById', () => {
    it('should get user by ID', async () => {
      const sampleId = new ObjectId();
      const user = getUser({ _id: sampleId });
      jest.spyOn(MockUserModel, 'findOne').mockReturnValue(user);

      const res = await userService.getUserById(user._id);
      expect(res).toBeDefined();
      expect(res._id).toStrictEqual(sampleId);
    });
  });
});
