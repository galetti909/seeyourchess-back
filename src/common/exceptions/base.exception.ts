import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from '../interfaces/exception.response';

export abstract class SYCBaseException extends HttpException {
  constructor(response: ExceptionResponse, status: HttpStatus) {
    super(response, status);
  }

  getResponse(): ExceptionResponse {
    return super.getResponse() as ExceptionResponse;
  }
}
