import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');

@Injectable()
export class CommonUtil {
  static generateOrderReference = (): string => {
    return `KD_${CommonUtil.generateRandomString(7)}`;
  };

  static generateExchangeReference = (): string => {
    return `EX_${CommonUtil.generateRandomString(7)}`;
  };

  static randomNumeric = (length: number) => {
    return randomstring.generate({
      length,
      charset: 'numeric',
    });
  };

  static randomAlphaNumericString = (length: number) => {
    return randomstring.generate({
      length,
      charset: 'alphanumeric',
    });
  };

  static generateRandomString = (length: number) => {
    return Math.random()
      .toString(36)
      .slice(2, length + 2);
  };

  static generateToken = async (
    data: Record<string, any>,
    expiresIn?: string,
    secretKey?: string,
  ): Promise<string> => {
    const key = secretKey || process.env.JWT_SECRET_KEY;
    const expire = expiresIn || process.env.JWT_AUTH_TOKEN_VALIDATION_LENGTH;
    return JWT.sign(data, key, { expiresIn: expire });
  };

  static verifyToken = async (
    token: string,
    secretKey?: string,
  ): Promise<any> => {
    return JWT.verify(token, secretKey || process.env.JWT_SECRET_KEY);
  };

  static decodeJWT = async (token: string): Promise<any> => {
    return JWT.decode(token, { complete: true });
  };

  hashPassword = async (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
  };

  static isFailure = (status: string): boolean => {
    return !(status == '00' || status == '03');
  };

  static ip(ip: string) {
    if (ip.substring(0, 7) == '::ffff:') {
      ip = ip.substring(7);
    }
    return ip;
  }
}
