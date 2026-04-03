import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable, catchError, throwError } from 'rxjs';
import { ExpectedException } from '../exceptions/expected.exception';

@Injectable()
export class PrismaErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          switch (err.code) {
            case 'P2002': {
              const target = err.meta?.target as string[];
              const model = err.meta?.modelName as string;

              return throwError(
                () =>
                  new ExpectedException(
                    `This ${target[0]} is already associated with an existing ${model}.`, // WARN: if multiple fields unique constraint, may get confusing
                    HttpStatus.CONFLICT,
                    {
                      tech_message: 'Unique constraint violation',
                      table: model,
                      fields: target,
                    },
                  ),
              );
            }

            case 'P2015': {
              const target = err.meta?.target as string[];
              const model = err.meta?.modelName as string;

              return throwError(
                () =>
                  new ExpectedException(
                    `There is no ${model} with this ${target[0]}.`, // WARN: if multiple fields unique constraint, may get confusing
                    HttpStatus.CONFLICT,
                    {
                      tech_message: 'Related record not found',
                      table: model,
                      fields: target,
                    },
                  ),
              );
            }
          }
        }
        return throwError(() => err);
      }),
    );
  }
}
