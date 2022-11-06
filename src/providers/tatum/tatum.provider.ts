import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransferCryptoDTO } from '../../interfaces/transferCrypto.dto';
import { GenericResponseModel } from '../../models/generic-response-model';
import { TatumEthTransferPayload } from './tatum.cryptotransfer.request';
import { GetQuoteDTO } from '../../modules/order/dto/get-quote.dto';
import { ProviderQuoteResponse } from '../../models/get-quote-response.model';
import RequestUtil from '../../utils/request.utils';
import ICryptoTransferProvider from '../../interfaces/ICryptoTransferProvider';
@Injectable()
export default class TatumProvider implements ICryptoTransferProvider {
  async requeryTransferTransaction(hash: string): Promise<
    GenericResponseModel<{
      reference: string;
      status: string;
      providerResponse: any;
    }>
  > {
    try {
      const requeryUrl = process.env.TATUM_BASE_URL?.concat(
        process.env.TATUM_REQUERY_ETH_TRANSACTION,
      )?.replace('{hash}', hash);

      console.log('requeryUrl: %s', requeryUrl);

      const requeryCryptoTransferResponse = (
        await RequestUtil.makeGetRequest(requeryUrl, {
          'x-api-key': process.env.TATUM_API_KEY,
          'x-testnet-type': 'ethereum-goerli',
        })
      ).data;
      return requeryCryptoTransferResponse;
    } catch (error) {
      console.error('requeryTransferTransaction error \n %o', error);
      return null;
    }
  }

  async transferCrypto(transferCryptoDTO: TransferCryptoDTO): Promise<any> {
    try {
      console.info('transferCryptoDTO: \n %o', transferCryptoDTO);

      const transferUrl = process.env.TATUM_BASE_URL?.concat(
        process.env.TATUM_ETH_TRANSFER_ENDPOINT,
      );
      console.info('transferUrl: %s', transferUrl);

      const transferPayload: TatumEthTransferPayload = {
        to: transferCryptoDTO.recipientAddress,
        currency: transferCryptoDTO.crypto,
        amount: transferCryptoDTO.amount?.toString(),
        fromPrivateKey: process.env.ETH_WALLET_ADDRESS,
      };

      console.log('transferPayload \n %o', transferPayload);

      const transferCryptoResponse = (
        await RequestUtil.makePostRequest(transferUrl, transferPayload, {
          'x-api-key': process.env.TATUM_API_KEY,
          'x-testnet-type': 'ethereum-goerli',
        })
      ).data;
      console.info('transferCryptoResponse: \n %o', transferCryptoResponse);
      return transferCryptoResponse;
    } catch (error) {
      console.error('initiateTransfer error \n %o', error);
      throw new HttpException(
        error?.response?.data?.message ||
          'An error occurred while trying to perform this operating',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getQuote(getQuote: GetQuoteDTO): Promise<ProviderQuoteResponse> {
    try {
      console.info('getQuote: \n %o', getQuote);

      let getQuoteUrl = process.env.TATUM_BASE_URL?.concat(
        process.env.TATUM_RATE_ENDPOINT,
      )?.replace('{currency}', getQuote.baseCurrency);

      if (getQuote.targetCurrency) {
        getQuoteUrl = getQuoteUrl?.concat(
          `?basePair=${getQuote.targetCurrency}`,
        );
      }
      console.info('getQuoteUrl: %s', getQuoteUrl);

      const getQuoteResponse = (
        await RequestUtil.makeGetRequest(getQuoteUrl, {
          'x-api-key': process.env.TATUM_API_KEY,
        })
      ).data;
      console.info('getQuoteResponse: \n %o', getQuoteResponse);
      return {
        baseCurrency: getQuote.baseCurrency,
        baseValue: getQuoteResponse?.value,
        targetCurrency: getQuote.targetCurrency,
      };
    } catch (error) {
      console.error('initiateTransfer error \n %o', error);
      throw new HttpException(
        error?.response?.data?.message || 'Error getting quote',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
