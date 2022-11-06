import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { SupportedCrypto } from '../enums/supportcryptos.enum';

export class TransferCryptoDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsString()
  recipientAddress: string;

  @IsNotEmpty()
  @IsEnum(SupportedCrypto)
  crypto: SupportedCrypto;

  meta?: any;
}
