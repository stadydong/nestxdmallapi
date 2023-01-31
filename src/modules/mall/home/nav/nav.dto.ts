import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNumber, IsString, Min } from "class-validator"

export class CreateNavDto {
  @IsString()
  @ApiProperty({description:"标题"})
  title:string
  @IsInt()
  @Min(0)
  @ApiProperty({description:"排序号"})
  orderNum:number
  @ApiProperty({description:"跳转的地址"})
  @IsString()
  toUrl:string
}