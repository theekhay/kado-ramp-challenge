import { Tradable } from '../enums/supportcryptos.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ProviderQuoteResponse {
  @ApiProperty({
    example: 'ETH',
    description: 'Base currency for quote',
  })
  'baseCurrency': Tradable;

  'baseValue': number;

  @ApiProperty({
    example: 'USD',
    description: 'Target currency for quote',
  })
  'targetCurrency'?: Tradable;
}

export class GetQuoteResponse extends ProviderQuoteResponse {
  @ApiProperty({
    example: 100,
    description: 'Quote Value',
  })
  'expectedPayment': number;

  @ApiProperty({
    example: 100,
    description: 'Estimated Charge for this transaction',
  })
  'charge': number;
}
