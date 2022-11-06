import { ObjectId } from 'mongodb';

const userServiceMock = {
  createUser: jest.fn().mockImplementation((data) => {
    data._id = new ObjectId();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return data;
  }),

  verifyPhoneNumber: jest.fn().mockImplementation(() => {
    return;
  }),
};

export default userServiceMock;
