import { ApiProperty } from '@nestjs/swagger'
import { IsEmpty, IsInt, IsString, Min } from 'class-validator'
import { PanelEntities } from 'src/entities/mall/home-panel.entities'

export class CreateGoodsDto {
  @ApiProperty({ description: '模块名称' })
  @IsString()
  title: string
  //类型1是轮播图模块,2是活动板块,3是精选商品模块
  @ApiProperty({ description: '模块的类型' })
  @IsInt()
  @Min(0)
  type: number
  //排序号
  @ApiProperty({ description: '排序号', default: 1 })
  @IsInt()
  @Min(1)
  orderNum: number
  @ApiProperty({ description: '状态', default: 1 })
  @IsInt()
  @Min(1)
  status: number
}
/**更新 */
export class UpdateCoodsDto extends CreateGoodsDto {
  @ApiProperty({ description: '模块对应内容' })
  @IsEmpty()
  panelId: PanelEntities[]
}
