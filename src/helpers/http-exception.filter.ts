import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status == 422) {
      console.error('exception.getResponse() \n %o', exception.getResponse);
      const messages = exception.getResponse()['message'];
      messages.forEach((message) => {
        console.error('message \n %o', message);
      });
    } else {
      console.error('exception.getResponse() \n %o', exception.getResponse());
    }
    response.status(status).json({
      statusCode: status,
      error: exception.getResponse(),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
