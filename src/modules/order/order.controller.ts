import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { IAuthenticatedReq } from '../../interfaces/authenticatedRequest';
import { FulfillOrderDTO } from './dto/fulfill-order.dto';
import { GetQuoteDTO } from './dto/get-quote.dto';
import { OrderService } from './order.service';

@Controller('ramp')
export class OrderController {
  constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
  ) {}

  @Post('/fulfill-order')
  async createOrder(
    @Req() req: IAuthenticatedReq,
    @Body() payload: FulfillOrderDTO,
  ) {
    try {
      return await this.orderService.fulfillOrder(payload, req.user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Operation failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/quote')
  async getQuote(@Query() payload: GetQuoteDTO) {
    try {
      return await this.orderService.getQuote(payload);
    } catch (error) {
      throw new HttpException(
        error.message || 'Operation failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
