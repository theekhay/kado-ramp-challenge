import { ApiProperty } from '@nestjs/swagger';
import { KadoResponseStatus } from '../enums/response.status.enum';
export class GenericResponseModel<T> {
  @ApiProperty({
    example: '00',
    description: 'Response status',
    enum: KadoResponseStatus,
  })
  statusCode: string;

  @ApiProperty({
    example: 'successful',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    example: 'any',
    description: 'data',
  })
  data: T;

  constructor(statusCode: string, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
