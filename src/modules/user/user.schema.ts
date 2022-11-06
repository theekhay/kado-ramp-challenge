import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true, lowercase: true, required: true, unique: true })
  email: string;

  @Prop({ trim: true, required: true })
  phoneNumber: string;

  @Prop({ trim: true, required: true })
  password: string;

  @Prop({ trim: true, default: '' })
  fullName?: string;

  @Prop()
  deletedAt: Date;

  isValidPassword: (password: string) => Promise<boolean>;
}

export const UserSchema: MongooseSchema<UserDocument> =
  SchemaFactory.createForClass(User);

UserSchema.methods = {
  async isValidPassword(password): Promise<boolean> {
    try {
      const storedPassword = this.password || '';
      return bcrypt.compare(password, storedPassword);
    } catch (err) {
      throw new Error(err);
    }
  },
};

UserSchema.pre<UserDocument>('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
});

export const UserSchemaDefinition = { name: User.name, schema: UserSchema };
