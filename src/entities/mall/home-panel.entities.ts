import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntities } from '../base.entities'
import { GoodsEntities } from './home-goods.entities'
import { ProductDetailEntities } from './product-detail.entities'
import { ProductEntities } from './product.entities'

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
  /**
   * 产品详情信息
   */
  // @Column({ type: 'int'})
  @ManyToOne(()=>ProductEntities,product=>product.penel)
  @JoinColumn()
  productId: ProductEntities
  //价格
  @Column({ type: 'decimal', default: '1.00', precision: 10, scale: 2 })
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
