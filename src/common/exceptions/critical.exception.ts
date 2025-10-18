import { HttpStatus } from '@nestjs/common';
import { SYCBaseException } from './base.exception';

export class CriticalException extends SYCBaseException {
  constructor(
    message: string,
    details?: any,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super({ message, details }, status);
  }
}
