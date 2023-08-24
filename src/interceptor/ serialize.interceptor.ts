import {
  UseInterceptors,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler
      .handle()
      .pipe(
        map((data: any) =>
          plainToClass(this.dto, data, { excludeExtraneousValues: true }),
        ),
      );
  }
}
