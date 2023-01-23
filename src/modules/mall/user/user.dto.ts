import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateUserDto{
  @IsString()
  @IsNotEmpty({message:"用户名不能为空"})
  @ApiProperty({description:"用户名"})
  username:string
  @IsString()
  @IsNotEmpty({message:"密码不能为空"})
  @ApiProperty({description:"密码"})
  password:string
}
// export class FindUIdDto{
//   // @IsNumberString({},{message:"id为数字"})
//   @IsNotEmpty({message:"用户id不能为空"})
//   id:string
// }