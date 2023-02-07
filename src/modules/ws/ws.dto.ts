import { PipeTransform, ValidationPipe } from "@nestjs/common";
import { IsString } from "class-validator";

export class GetMessageDto {
  @IsString()
  message:string
}
