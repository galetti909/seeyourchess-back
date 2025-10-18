import { HttpStatus } from '@nestjs/common';
import { SYCBaseException } from './base.exception';

export class ExpectedException extends SYCBaseException {
  constructor(
    message: string,
    details?: any,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ message, details }, status);
  }
}
