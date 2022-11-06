import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  SupportedCrypto,
  SupportedFiat,
} from '../../../enums/supportcryptos.enum';

export class FulfillOrderDTO {
  @IsNotEmpty()
  @IsNumber()
  cryptoUnitCount: number;

  @IsNotEmpty()
  @IsEnum(SupportedCrypto)
  cryptoCurrencyName: SupportedCrypto;

  @IsNotEmpty()
  @IsEnum(SupportedFiat)
  fiat: SupportedFiat;

  @IsNotEmpty()
  @IsNumber()
  fiatValue: number;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
