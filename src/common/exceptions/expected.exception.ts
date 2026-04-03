import { HttpStatus } from '@nestjs/common';
import { SYCBaseException } from './base.exception';

export class ExpectedException extends SYCBaseException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    details: any = undefined,
  ) {
    super({ message, details }, status);
  }
}
