/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    /**
     * @param exception The exception parameter is the exception object currently being processed. 
     * @param host In this case we use ArgumentsHost to get the desired Request and Response objects.
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // We've used some helper methods on ArgumentsHost to get the desired Request and Response objects.

        const response = ctx.getResponse<Response>();
        const request = ctx.getResponse<Request>();

        const status = exception.getResponse()["statusCode"] || exception.getStatus();

        console.log("[HttpExceptionFilter]", exception.getResponse());
        const message = (typeof exception.getResponse()["message"]) == "string" ? exception.getResponse()["message"] : exception.getResponse()["message"][0];
        
        return response
        .status(200)
        .json({
          status,
          message,
          data: null
        });
    }
}