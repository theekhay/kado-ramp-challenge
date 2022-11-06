import { UserController } from './modules/user/user.controller';
import { VerifyTokenMiddleware } from './middlewares/authentication';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HelpersModule } from './helpers/helpers.module';
import { OrderModule } from './modules/order/order.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    EventEmitterModule.forRoot(),
    UserModule,
    HelpersModule,
    OrderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes(UserController);
  }
}
