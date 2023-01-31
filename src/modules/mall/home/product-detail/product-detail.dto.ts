import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsInt, IsNumber, IsString, Min } from 'class-validator'

export class CreateProductDetail {
  @ApiProperty({ description: '产品标题' ,default:"TCL新风空调1.5匹 新一级变频冷暖 60m³/h大新风量小蓝翼Ⅱ空调挂机KFRd-35GW/D-SWA11Bp(B1) 【一价全包版】"})
  @IsString()
  title: string
  @ApiProperty({ description: '产品出售价格',default:"3099.00"})
  @IsNumber()
  salePrice: number
  @ApiProperty({ description: '产品数量',default:100})
  @IsInt()
  @Min(0)
  limitNum: number
  @ApiProperty({ description: '产品展示图片  以,作为间隔',default:"http://localhost:3000/product_swiper/swiper1-1.jpg,http://localhost:3000/product_swiper/swiper1-2.jpg,http://localhost:3000/product_swiper/swiper1-3.jpg,http://localhost:3000/product_swiper/swiper1-4.jpg"})
  @IsString()
  detailImg: string
  @ApiProperty({ description: '产品详情介绍图片  以,作为间隔',default:"http://localhost:3000/product_img/product1-1.jpg"})
  @IsString()
  detailInfoImg: string
  @ApiProperty({ description: '产品描述',default:"这是一段商品的描述"})
  @IsString()
  desc:string
}
