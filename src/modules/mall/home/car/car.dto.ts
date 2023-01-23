import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class CreateCarDto{
  @ApiProperty({description:"购物车的id"})
  @IsInt()
  carId:number
  @ApiProperty({description:"要购买的商品数量"})
  @IsInt()
  @Min(1)
  num:number
  @ApiProperty({description:"商品详情id"})
  @IsInt()
  productId:number
}
export class UpdateCarDto{
  @ApiProperty({description:"购物车的id"})
  @IsInt()
  carId:number
  @ApiProperty({description:"要购买的商品数量"})
  @IsInt()
  @Min(1)
  num:number
}