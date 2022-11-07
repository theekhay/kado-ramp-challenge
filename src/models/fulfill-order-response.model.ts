import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../definitions/types';
import { SupportedCrypto, SupportedFiat } from '../enums/supportcryptos.enum';

export class FulfillOrderResponse {
  @ApiProperty({
    example:
      '0x79ba7ed2198719469b15d602238581e94550374d5fe2e30ea270699f4c6b2354',
    description: 'Transaction hash from response',
  })
  hash: string;

  @ApiProperty({
    example: 'KD-74646464',
    description: 'Unique order reference',
  })
  reference: string;

  @ApiProperty({
    example: 0.3,
    description: 'quantity of crypto to be transferred to buyer`s wallet',
  })
  quantity: number;

  @ApiProperty({
    example: 'ETH',
    description: 'crypto currency being ramped',
    enum: SupportedCrypto,
  })
  crypto: SupportedCrypto;

  @ApiProperty({
    example: '00',
    description: 'Status of the order',
    enum: PaymentStatus,
  })
  status: PaymentStatus;

  @ApiProperty({
    example: 'USD',
    description: 'fiat used for transaction',
    enum: SupportedFiat,
  })
  fiat: SupportedFiat;

  @ApiProperty({
    example: '00',
    description: 'fiat value paid for transaction',
  })
  fiatValue: number;
}

export class ProviderFulfillOrderResponse {
  @ApiProperty({
    example: 'USD',
    description: 'Response from the provider',
  })
  response: any;

  @ApiProperty({
    example: 'USD',
    description: 'Transaction hash from response',
  })
  hash: string;
}
