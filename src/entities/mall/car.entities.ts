import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntities } from "../base.entities";
import { CarShoppinginfoEntitiess } from "./car-shopping-info.entities";
import { UserEntities } from "./users.entities";

@Entity({name:"home_cart"})
export class CarEntities extends BaseEntities{
  @PrimaryGeneratedColumn()
  id:number
  
  @OneToOne(()=>UserEntities)
  user:UserEntities

  @OneToMany(()=>CarShoppinginfoEntitiess,(carshoppinginfo)=>carshoppinginfo.car)
  carshoppinginfo:CarShoppinginfoEntitiess[]
}