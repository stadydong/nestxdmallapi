import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntities } from "../base.entities";
import { CarEntities } from "./car.entities";
import { UserOrderListEntities } from "./user-orderList.entities";

@Entity({name:"user"})
export class UserEntities extends BaseEntities{
  @PrimaryGeneratedColumn()
  id:number
  @Column({unique:true})
  username:string
  @Column()
  password:string
  @Column({type:"varchar",default:"http://localhost:3000/uimg/uimg1.png"})
  imgUrl:string
  @OneToOne(()=>CarEntities)
  @JoinColumn()
  car:CarEntities

  @OneToMany(()=>UserOrderListEntities,(orderList)=>orderList.user)
  orderList:UserOrderListEntities[]
}