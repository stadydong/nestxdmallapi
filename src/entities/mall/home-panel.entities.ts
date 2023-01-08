import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntities } from '../base.entities'
import { GoodsEntities } from './home-goods.entities'

@Entity({ name: 'home_panel' })
export class PanelEntities extends BaseEntities {
  @PrimaryGeneratedColumn()
  id: number
  //标题
  @Column({ type: 'varchar', length: 50 })
  title: string
  //商品描述
  @Column({ type: 'varchar', default: '商品的描述' })
  desc: string
  //图片地址
  @Column({ type: 'varchar' })
  productImageUrl: string
  @Column({ type: 'int' ,default:1})
  productDetailId: number
  //价格
  @Column({ type: "decimal", default: '1.00' ,precision:10,scale:2})
  price: number
  //排序号
  @Column({ name: 'order_num', type: 'int', default: '1' })
  orderNum: number
  @Column({ type: 'int', default: '1' })
  status: number
  @ManyToOne(() => GoodsEntities, (goods) => goods.panel)
  @JoinColumn({ name: 'goods_id' })
  goods: GoodsEntities
}
