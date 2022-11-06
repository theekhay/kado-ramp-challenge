import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaDefinition } from '../modules/user/user.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([UserSchemaDefinition])],
  providers: [],
  exports: [],
})
export class HelpersModule {}
