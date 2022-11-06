import { SupportedCrypto } from '../../enums/supportcryptos.enum';

export interface TatumEthTransferPayload {
  to: string;
  currency: SupportedCrypto;
  amount: string;
  fromPrivateKey: string;
}
