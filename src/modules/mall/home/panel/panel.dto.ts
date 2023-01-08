import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString, Min } from 'class-validator'

export class CreatePanelDto {
  @IsString()
  @ApiProperty({ description: '名称' ,default:"小米10"})
  title: string
  @IsString()
  @ApiProperty({ description: '价格', default: '1.00' })
  price: string
  @IsString()
  @ApiProperty({ description: '描述', default: '这是一段商品的描述' })
  desc: string
  @IsString()
  @ApiProperty({
    description: '图片地址',
    default: 'http://localhost:3000/swiper/swiper1.webp',
  })
  productImageUrl: string
  @IsInt()
  @Min(0) 
  @ApiProperty({ description: '产品ID' })
  productId: number
  @IsInt()
  @Min(0)
  @ApiProperty({ description: '父级模块id', default: 1 })
  pid: number
  @IsInt()
  @Min(1)
  @ApiProperty({ description: '排序号', default: 1 })
  orderNum: number
  @IsInt()
  @Min(1)
  @ApiProperty({ description: '状态', default: 1 })
  status: number
}
