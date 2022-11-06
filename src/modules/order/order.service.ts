import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../user/user.schema';
import { FulfillOrderDTO } from './dto/fulfill-order.dto';
import { Order } from './order.schema';
import { GenericResponseModel } from '../../models/generic-response-model';
import { FulfillOrderResponse } from '../../models/fulfill-order-response.model';
import { KadoResponseStatus } from '../../enums/response.status.enum';
import { Model } from 'mongoose';
import { CommonUtil } from '../../utils/commons.util';
import { Inject } from '@nestjs/common';
import { TransferCryptoDTO } from '../../interfaces/transferCrypto.dto';
import { PaymentStatus } from '../../definitions/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { KadoEvent } from '../../enums/kado.events.enum';
import { GetQuoteDTO } from './dto/get-quote.dto';
import { GetQuoteResponse } from '../../models/get-quote-response.model';
import RampProviderFactory from '../../ramp.provider.factory';

export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,

    @Inject('RAMP_PROVIDER')
    private readonly rampProviderFactory: RampProviderFactory,

    private eventEmitter: EventEmitter2,
  ) {}

  async fulfillOrder(
    payload: FulfillOrderDTO,
    user?: UserDocument,
  ): Promise<GenericResponseModel<FulfillOrderResponse>> {
    const reference = CommonUtil.generateOrderReference();

    try {
      const transferRequest: TransferCryptoDTO = {
        amount: payload.cryptoUnitCount,
        recipientAddress: payload.walletAddress,
        crypto: payload.cryptoCurrencyName,
        meta: reference,
      };

      console.log('transferRequest \n %o', transferRequest);

      const provider = await this.rampProviderFactory.getCryptoTransferProvider(
        payload?.cryptoCurrencyName,
      );
      const transferResponse = await provider.transferCrypto(transferRequest);

      let order = new this.orderModel({
        ...payload,
        reference,
        quantity: payload.cryptoUnitCount,
        currency: payload.cryptoCurrencyName,
        user: user?._id,
        transferResponse: JSON.stringify(transferResponse),
        status: PaymentStatus.SUCCESS,
        processor: 'tatum',
      });
      order = await order.save();

      this.eventEmitter.emit(KadoEvent.ORDER_SUCCESSFUL, { order, user });

      return new GenericResponseModel(
        KadoResponseStatus.SUCCESS,
        'Operation Successful',
        order,
      );
    } catch (error) {
      console.error('fulfillOrder error \n %o', error);
      this.handleTransferError(payload, reference, user, error);
      return new GenericResponseModel(
        KadoResponseStatus.FAILED,
        error.message || 'Operation failed',
        null,
      );
    }
  }

  async getQuote(
    getQuoteDTO: GetQuoteDTO,
  ): Promise<GenericResponseModel<GetQuoteResponse>> {
    try {
      const provider = await this.rampProviderFactory.getQuoteProvider();
      const quoteResponse = await provider.getQuote(getQuoteDTO);

      const targetValue = getQuoteDTO.amount
        ? getQuoteDTO.amount * quoteResponse.baseValue
        : null;
      return new GenericResponseModel(
        KadoResponseStatus.SUCCESS,
        'Quote returned successfully',
        { ...quoteResponse, targetValue },
      );
    } catch (error) {
      console.error('getQuote error \n %o', error);
      return new GenericResponseModel(
        KadoResponseStatus.FAILED,
        error.message || 'Operation failed',
        null,
      );
    }
  }

  private async handleTransferError(
    payload: FulfillOrderDTO,
    reference: string,
    user: UserDocument,
    error: any,
  ): Promise<void> {
    try {
      const order = new this.orderModel({
        ...payload,
        reference,
        quantity: payload.cryptoUnitCount,
        currency: payload.cryptoCurrencyName,
        user: user?._id,
        transferResponse: JSON.stringify(error?.response?.data || error),
        status: PaymentStatus.FAILED,
        processor: 'tatum',
      });

      await order.save();
      //send notification
    } catch (error) {
      console.error('handleTransferError error \n %o', error);
    }
  }
}
