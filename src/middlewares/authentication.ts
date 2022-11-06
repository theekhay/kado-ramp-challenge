import { IAuthenticatedReq } from './../interfaces/authenticatedRequest';
import { UserService } from '../modules/user/user.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { CommonUtil } from '../utils/commons.util';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async use(req: IAuthenticatedReq, res: Response, next: NextFunction) {
    if (!req.header('authorization')) {
      throw new HttpException(
        'Authorization header not found',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const [signature, token] = req.header('authorization').split(' ');

    if (signature.toLowerCase() !== 'bearer')
      throw new HttpException(
        'Invalid token signature',
        HttpStatus.BAD_REQUEST,
      );
    if (!token)
      throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);

    const decoded: any = await CommonUtil.verifyToken(token).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });

    const user = await this.userService.getUserById(decoded.id);

    if (!user)
      throw new HttpException(
        'User from token not found',
        HttpStatus.NOT_FOUND,
      );

    req.user = user;
    return next();
  }
}
