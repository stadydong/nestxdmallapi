import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntities } from "../base.entities";
import { CarShoppinginfoEntities } from "./car-shopping-info.entities";
import { CarEntities } from "./car.entities";
import { ProductEntities } from "./product.entities";
import { UserOrderListEntities } from "./user-orderList.entities";


@Entity({name:"user_order_list_item"})
export class UserOrderListItemEntities extends BaseEntities{
  @PrimaryGeneratedColumn()
  id:number
  @ManyToOne(()=>UserOrderListEntities,(orderList)=>orderList.orderListItem)
  orderList:UserOrderListEntities

  @Column({ type: 'int' })
  num: number
  /**
   * 商品的id
   */
  @ManyToOne(()=>ProductEntities,(product)=>product.orderListItem)
  @JoinColumn()
  product: ProductEntities

}
