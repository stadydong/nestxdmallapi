import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, Min } from "class-validator";

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
  @IsOptional()
  @IsArray()
  @ApiProperty({description:"购物车当前商品id"})
  id:number[]
  @IsOptional()
  @IsInt()
  @ApiProperty({description:"是否是选中状态 0 | 1"})
  checked:number
}
export class UpdateCheckedDto{
  @ApiProperty({description:"购物车的id"})
  @IsInt()
  carId:number
  @IsArray()
  @ApiProperty({description:"购物车当前商品id",default:[1,2]})
  id:number[]
  @IsInt()
  @ApiProperty({description:"是否是选中状态 0 | 1"})
  checked:number
}

// export class UpdateCarShoppingDto{
//   @ApiProperty({description:"购物车数据的id"})
//   @IsArray()
//   carId:number
// }