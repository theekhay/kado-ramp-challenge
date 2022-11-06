export enum SupportedCrypto {
  ETH = 'ETH',
}

export enum SupportedFiat {
  USD = 'USD',
}

export type Tradable = SupportedCrypto | SupportedFiat;
