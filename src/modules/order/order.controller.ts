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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthenticatedReq } from '../../interfaces/authenticatedRequest';
import { FulfillOrderResponse } from '../../models/fulfill-order-response.model';
import { GenericResponseModel } from '../../models/generic-response-model';
import { GetQuoteResponse } from '../../models/get-quote-response.model';
import { FulfillOrderDTO } from './dto/fulfill-order.dto';
import { GetQuoteDTO } from './dto/get-quote.dto';
import { OrderService } from './order.service';

@Controller('ramp')
@ApiTags('Ramp')
export class OrderController {
  constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
  ) {}

  @Post('/fulfill-order')
  @ApiOperation({ summary: 'Fulfill Order' })
  @ApiResponse({
    status: 200,
    description: 'ok.',
    type: GenericResponseModel,
    // eslint-disable-next-line prettier/prettier
  })
  async createOrder(
    @Req() req: IAuthenticatedReq,
    @Body() payload: FulfillOrderDTO,
  ): Promise<FulfillOrderResponse> {
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
  @ApiResponse({
    status: 200,
    description: 'ok.',
    type: GetQuoteResponse,
    // eslint-disable-next-line prettier/prettier
  })
  async getQuote(
    @Query() payload: GetQuoteDTO,
  ): Promise<GenericResponseModel<GetQuoteResponse>> {
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
