import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { SYCBaseException } from '../exceptions/base.exception';
import { CriticalException } from '../exceptions/critical.exception';
import { ExpectedException } from '../exceptions/expected.exception';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof ExpectedException) {
      return;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const ip =
      (request.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (request as any).ip;
    const label =
      exception instanceof CriticalException ? 'CRITICAL' : 'UNEXPECTED';

    const log_data = {
      method: request.method,
      url: request.url,
      ip,
      userAgent: request.headers['user-agent'],
      status: exception instanceof HttpException ? exception.getStatus() : 500,
      label,
      stack:
        process.env.NODE_ENV === 'production' ? undefined : exception.stack,
      details:
        exception instanceof SYCBaseException
          ? exception.getResponse().details
          : undefined,
    };

    this.logger.error(`[${label}]`, exception.message, log_data);
  }
}
