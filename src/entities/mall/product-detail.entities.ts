import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntities } from '../base.entities'
import { ProductEntities } from './product.entities'
/**
 * 产品详细信息
 */
@Entity({ name: 'home_product_detail' })
export class ProductDetailEntities extends BaseEntities {
  @PrimaryGeneratedColumn()
  id: number
  //产品标题
  @Column({ type: 'varchar' })
  title: string
  //出售价格
  @Column({ type: 'decimal', default: '1.00', precision: 10, scale: 2 })
  salePrice: number
  //产品数量
  @Column({ type: 'int' })
  limitNum: number
  @Column({ type: 'varchar', default: '这是一段商品的描述' })
  desc: string
  @Column({ type: 'varchar' })
  detailImg: string
  @Column({ type: 'varchar' })
  detailInfoImg: string
}
