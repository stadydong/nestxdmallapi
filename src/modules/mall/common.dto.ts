import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumberString, IsOptional } from "class-validator";

export class paginnation_params_dto{
  @ApiProperty({description:"跳过多少条数据",default:0,required:false})
  @IsOptional()
  @IsNumberString()  //检测字符串是否为数字
  skip:""
  @ApiProperty({description:"获取多少条数据",default:20,required:false})
  @IsOptional()
  @IsNumberString()  //检测字符串是否为数字
  take:""
}
export class IdsDTO{
  @IsArray()
  ids:Array<number>
}