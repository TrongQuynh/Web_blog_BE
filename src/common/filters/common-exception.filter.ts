import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionResponse extends HttpException {
  
  constructor(status?: HttpStatus, message?: string | string[], data?: any) {

    super(
      {
        status: status || HttpStatus.BAD_REQUEST,
        message: message || 'Dữ liệu không hợp lệ!',
        data: data || null,
      },
      HttpStatus.OK,
    );

  }
}

export class CatchException extends ExceptionResponse {
  constructor(error: any) {
    const { statusCode, message, data } = error ?? {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong!',
      data: null
    };
    // super(error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR, error?.message || 'Something went wrong!');
    super(statusCode, message, data);
  }
}
