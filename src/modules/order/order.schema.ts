import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PaymentStatus } from '../../definitions/types';
import { User } from '../user/user.schema';
import {
  SupportedCrypto,
  SupportedFiat,
} from '../../enums/supportcryptos.enum';
import * as mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    default: null,
  })
  user: any;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, type: String, enum: SupportedCrypto })
  currency: SupportedCrypto;

  @Prop({ required: true, type: String, enum: SupportedFiat })
  fiat: SupportedFiat;

  @Prop({
    required: true,
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Prop({ required: true })
  fiatValue: number;

  @Prop({ required: true, unique: true })
  reference: string;

  @Prop({ required: true })
  walletAddress: string;

  @Prop({})
  charge: number;

  @Prop({})
  ipAddress: string;

  @Prop({})
  processor: string;

  @Prop({})
  transferResponse: string;
}

export const OrderSchema: MongooseSchema<OrderDocument> =
  SchemaFactory.createForClass(Order);

export const OrderSchemaDefinition = {
  name: Order.name,
  schema: OrderSchema,
};
