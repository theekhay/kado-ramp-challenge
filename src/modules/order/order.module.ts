import { OrderSchemaDefinition } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserSchemaDefinition } from '../user/user.schema';
import { UserModule } from '../user/user.module';
import TatumProvider from '../../providers/tatum/tatum.provider';
import RampProviderFactory from '../../ramp.provider.factory';

@Module({
  imports: [
    MongooseModule.forFeature([OrderSchemaDefinition, UserSchemaDefinition]),

    UserModule,
  ],
  providers: [
    OrderService,
    TatumProvider,
    {
      provide: 'RAMP_PROVIDER',
      useClass: RampProviderFactory,
    },
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
