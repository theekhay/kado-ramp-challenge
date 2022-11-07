import { ProviderFulfillOrderResponse } from '../models/fulfill-order-response.model';
import { GenericResponseModel } from '../models/generic-response-model';
import { ProviderQuoteResponse } from '../models/get-quote-response.model';
import { GetQuoteDTO } from '../modules/order/dto/get-quote.dto';
import { TransferCryptoDTO } from './transferCrypto.dto';

export default interface ICryptoTransferProvider {
  transferCrypto(
    transferCryptoDTO: TransferCryptoDTO,
  ): Promise<ProviderFulfillOrderResponse>;

  getQuote(getQuoteRequest: GetQuoteDTO): Promise<ProviderQuoteResponse>;

  requeryTransferTransaction(
    reference: string,
  ): Promise<GenericResponseModel<{ reference: string; status: string }>>;
}
