import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntities } from '../base.entities'
import { CarShoppinginfoEntities } from './car-shopping-info.entities'
import { PanelEntities } from './home-panel.entities'
import { ProductDetailEntities } from './product-detail.entities'
import { UserOrderListItemEntities } from './user-orderListItem.entities'

/**
 * 展示所有产品
 */
// phone
@Entity({ name: 'home_product' })
export class ProductEntities extends BaseEntities {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', default: '产品标题' })
  title: string
  @Column({ type: 'varchar', default: '产品描述' })
  desc: string
  //产品展示的图片地址
  @Column({ type: 'varchar' })
  productImageUrl: string
  //价格
  @Column({ type: 'decimal', default: '1.00', precision: 10, scale: 2 })
  price: number
  @Column({ type: 'varchar' })
  type: string
  /**产品详情 */
  @OneToOne(() => ProductDetailEntities)
  @JoinColumn()
  productDetail: ProductDetailEntities
  /**购物车的 */
  @OneToOne(() => CarShoppinginfoEntities)
  carShoppingInfo: CarShoppinginfoEntities

  /** 首页商品 */
  @OneToMany(() => PanelEntities,(penel)=>penel.productId)
  penel: PanelEntities
  /** 订单列表*/
  @OneToMany(() => UserOrderListItemEntities,(orderListItem)=>orderListItem.product)
  orderListItem: UserOrderListItemEntities[]
}
