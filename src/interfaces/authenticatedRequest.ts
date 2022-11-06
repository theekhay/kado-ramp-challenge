import { Request } from 'express';
import { UserDocument } from '../modules/user/user.schema';

export interface IAuthenticatedReq extends Request {
  user: UserDocument;
}
