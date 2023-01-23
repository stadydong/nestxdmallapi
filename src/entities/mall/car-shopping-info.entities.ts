import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntities } from '../base.entities'
import { CarEntities } from './car.entities'
import { ProductEntities } from './product.entities'

@Entity({ name: 'home_cart_shopping_info' })

export class CarShoppinginfoEntitiess extends BaseEntities {
  @PrimaryGeneratedColumn()
  id: number
  /**
   * 要购买的商品数量
   */
  @Column({ type: 'int' })
  num: number
  /**
   * 商品的id
   */
  @OneToOne(()=>ProductEntities)
  @JoinColumn()
  product: ProductEntities

  @ManyToOne(() => CarEntities, (car) => car.carshoppinginfo)
  car: CarEntities
}
