import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntities } from '../base.entities'
import { PanelEntities } from './home-panel.entities'

@Entity({ name: 'home_goods' })
export class GoodsEntities extends BaseEntities {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 50 })
  title: string
  //类型1是轮播图模块,2是活动板块,3是精选商品模块
  @Column({ type: 'int', default: '1' })
  type: number
  //排序号
  @Column({ name: 'order_num', type: 'int', default: '1' })
  orderNum: number
  //前往的地址
  @Column({ type: 'int', default: '1' })
  status: number
  // panelContents
  @OneToMany(() => PanelEntities, (panel) => panel.goods)
  panel: PanelEntities[]
}
