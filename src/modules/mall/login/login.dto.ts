import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UserMainDto } from "../user/user.dto";

export class LoginDto extends UserMainDto{
  @IsString()
  @IsNotEmpty({message:"验证码不能为空"})
  @ApiProperty({description:"验证码"})
  code:string
}