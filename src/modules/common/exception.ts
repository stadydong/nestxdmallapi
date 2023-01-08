import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCodeMap, ErrorCodeMapType } from "./error-code.constant";


export class ApiException extends HttpException{
  constructor(ErrorCode:ErrorCodeMapType){
    super(ErrorCodeMap[ErrorCode],200)
  }
}