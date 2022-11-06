import { Tradable } from '../enums/supportcryptos.enum';

export class ProviderQuoteResponse {
  'baseCurrency': Tradable;
  'baseValue': number;
  'targetCurrency'?: Tradable;
}

export class GetQuoteResponse extends ProviderQuoteResponse {
  'targetValue': number;
}
