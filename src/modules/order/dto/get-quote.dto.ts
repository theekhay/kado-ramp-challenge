import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import {
  SupportedCrypto,
  SupportedFiat,
  Tradable,
} from '../../../enums/supportcryptos.enum';

export class GetQuoteDTO {
  @IsNotEmpty()
  @IsString()
  baseCurrency: Tradable;

  @IsNotEmpty()
  @IsNumberString()
  amount: number;

  @IsNotEmpty()
  @IsString()
  targetCurrency: SupportedCrypto | SupportedFiat;
}
