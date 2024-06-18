import { HttpStatus } from "@nestjs/common";

export interface IHttpResponse<T> {
    data: T;
    message: string;
    status: HttpStatus;
  }