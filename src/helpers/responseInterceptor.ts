import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { GenericResponseModel } from '../models/generic-response-model';
import { CommonUtil } from '../utils/commons.util';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, GenericResponseModel<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<GenericResponseModel<T>> {
    const ctx = context.switchToHttp();
    const httpResponse = ctx.getResponse();

    return next.handle().pipe(
      map((incomingResponse: any) => {
        if (
          incomingResponse instanceof GenericResponseModel &&
          CommonUtil.isFailure(incomingResponse?.statusCode)
        ) {
          httpResponse.status(400);
        }
        return incomingResponse;
      }),
    );
  }
}
