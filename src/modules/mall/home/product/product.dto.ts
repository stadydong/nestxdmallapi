import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNumber, IsNumberString, IsOptional, IsString, Min } from 'class-validator'
import { paginnation_params_dto } from '../../common.dto'

export class CreateProductDto {
  @IsString()
  @ApiProperty({ description: '产品标题' ,default:"小米10"})
  title: string
  @IsString()
  @ApiProperty({ description: '产品描述' })
  desc: string
  @IsString()
  @ApiProperty({ description: '产品图片地址',default:"http://localhost:3000/product_swiper/swiper1-1.jpg"})
  productImageUrl: string
  @IsNumber()
  @ApiProperty({ description: '产品价格' })
  price: number
  @IsString()
  @ApiProperty({ description: '产品类型' })
  type:string
  @IsInt()
  @Min(0)
  @ApiProperty({ description: '产品详情ID' })
  productDetailId: number
}

export class orderProductDto extends paginnation_params_dto{
  @IsOptional()
  @IsNumberString()
  @ApiProperty({description:"0代表综合排序,1代表升价,2代表降价",default:0,required:false})
  priceOrderType:string
  @IsOptional()
  @IsNumberString()
  @ApiProperty({description:"商品从什么价格开始",default:0,required:false})
  startPrice:string
  @IsOptional()
  @IsNumberString()
  @ApiProperty({description:"商品从什么价格结束",default:0,required:false})
  endPrice:string
  
}
