import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Tradable } from '../../../enums/supportcryptos.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetQuoteDTO {
  @ApiProperty({
    example: 'ETH',
    description: 'baseCurrency',
  })
  @IsNotEmpty()
  @IsString()
  baseCurrency: Tradable;

  @ApiProperty({
    example: 0.3,
    description: 'quote amount',
  })
  @IsNotEmpty()
  @IsNumberString()
  amount: number;

  @ApiProperty({
    example: 'USD',
    description: 'target currency',
  })
  @IsNotEmpty()
  @IsString()
  targetCurrency: Tradable;
}
