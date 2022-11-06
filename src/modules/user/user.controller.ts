import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Patch,
  Query,
  Req,
  Post,
} from '@nestjs/common';
import { IAuthenticatedReq } from '../../interfaces/authenticatedRequest';
import { messages } from '../../definitions/constants';
import { Request } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
// @UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    try {
      const response = await this.userService.createUser(createUserDTO);
      return { message: messages.SUCCESS_MESSAGE, response };
    } catch (error) {
      console.error('fetch user bank detail error \n %o', error);
      throw new HttpException(messages.FAILURE_MESSAGE, HttpStatus.BAD_REQUEST);
    }
  }
}
