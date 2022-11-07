export enum SupportedCrypto {
  ETH = 'ETH',
  BTC = 'BTC',
}

export enum SupportedFiat {
  USD = 'USD',
  EUR = 'EUR',
  NGN = 'NGN',
}

export type Tradable = SupportedCrypto | SupportedFiat;
