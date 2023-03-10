import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntities } from '../base.entities'
import { CarEntities } from './car.entities'
import { ProductEntities } from './product.entities'

@Entity({ name: 'home_cart_shopping_info' })

export class CarShoppinginfoEntities extends BaseEntities {
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
  @ManyToOne(()=>ProductEntities,(product)=>product.carShoppingInfo)
  @JoinColumn()
  product: ProductEntities

  @ManyToOne(() => CarEntities, (car) => car.carshoppinginfo)
  car: CarEntities
  @Column({type:"int",default:1})
  checked:number
}
