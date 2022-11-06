import { ObjectId } from 'mongodb';

const mockUserModel = {
  create: jest.fn().mockImplementation((data) => {
    data._id = new ObjectId();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return data;
  }),

  findOneAndUpdate: jest.fn().mockImplementation(() => {
    return;
  }),

  findOne: jest.fn().mockImplementation(() => {
    return;
  }),
};

export default mockUserModel;
