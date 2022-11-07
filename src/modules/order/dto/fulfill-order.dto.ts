import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  SupportedCrypto,
  SupportedFiat,
} from '../../../enums/supportcryptos.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FulfillOrderDTO {
  @ApiProperty({
    example: 0.3,
    description: 'amount of crypto to be exchanged',
  })
  @IsNotEmpty()
  @IsNumber()
  cryptoUnitCount: number;

  @ApiProperty({
    example: 'ETH',
    description: 'name of crypto to be ramped',
    enum: SupportedCrypto,
  })
  @IsNotEmpty()
  @IsEnum(SupportedCrypto)
  crypto: SupportedCrypto;

  @ApiProperty({
    example: 'USD',
    description: 'the fiat currency for this transaction',
    enum: SupportedFiat,
  })
  @IsNotEmpty()
  @IsEnum(SupportedFiat)
  fiat: SupportedFiat;

  @ApiProperty({ example: 200, description: 'Value of the fiat currency' })
  @IsNotEmpty()
  @IsNumber()
  fiatValue: number;

  @ApiProperty({
    example: '0xfCef0e1369CDC6f322B985DB4999be4052a18dre',
    description: 'web3 wallet to be credited',
  })
  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
