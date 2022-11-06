import { Injectable } from '@nestjs/common';
import { SupportedCrypto } from './enums/supportcryptos.enum';
import ICryptoTransferProvider from './interfaces/ICryptoTransferProvider';
import TatumProvider from './providers/tatum/tatum.provider';

@Injectable()
export default class RampProviderFactory {
  constructor(private readonly tatum: TatumProvider) {}

  async getCryptoTransferProvider(
    currency: SupportedCrypto,
  ): Promise<ICryptoTransferProvider> {
    try {
      /**
       * We are manually provisioning a provider for a currency for this assessment
       * This should be defined in the db and should be updated programmatically if need be.
       */
      switch (currency?.toUpperCase()) {
        case SupportedCrypto.ETH:
          return this.tatum;
          break;

        default:
          throw new Error('Provider not found for this currency');
          break;
      }
    } catch (error) {
      console.error(
        'getProvider error. could not create provider. Switching to Tatum as default \n %o',
        error,
      );
      return this.tatum;
    }
  }

  async getQuoteProvider(): Promise<ICryptoTransferProvider> {
    try {
      return this.tatum;
    } catch (error) {
      console.error(
        'getProvider error. could not create provider. Switching to Tatum as default \n %o',
        error,
      );
      return this.tatum;
    }
  }
}
