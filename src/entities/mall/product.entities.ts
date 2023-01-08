import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntities } from '../base.entities'

/**
 * 展示所有产品
 */
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
  @Column({ type: "decimal", default: '1.00' ,precision:10,scale:2})
  price: number
  @Column({ type: 'varchar' })
  type: string
  @Column({ type: 'int',nullable:true})
  productDetailId: number
}
