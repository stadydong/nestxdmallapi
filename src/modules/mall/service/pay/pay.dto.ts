import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumberString, IsString } from "class-validator";
/** */

export class wxPayDto{
  @ApiProperty({description:"购物车id",required:false })
  @IsString()
  @IsNumberString()
  carId:number
  @ApiProperty({description:"用户id",required:false })
  @IsString()
  @IsNumberString()
  userId:number



}