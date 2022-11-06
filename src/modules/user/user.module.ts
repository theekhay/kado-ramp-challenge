import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchemaDefinition } from './user.schema';
import { OrderSchemaDefinition } from '../order/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([UserSchemaDefinition, OrderSchemaDefinition]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
