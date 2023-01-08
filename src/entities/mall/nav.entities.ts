import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";
import { BaseEntities } from '../base.entities'
@Entity({name:"home_nav"})
export class NavEntities extends BaseEntities{
  @PrimaryGeneratedColumn()
  id:number
  @Column({type:"varchar",length:50})
  title:string
  @Column({type:"int",default:"0"})
  type:number
  //0代表是菜单，1代表目录
  @Column({type:"int",default:"0"})
  pid:number
  //排序号
  @Column({name:"order_num",type:"int",default:"1"})
  orderNum:number
  //前往的地址
  @Column({type:"varchar"})
  toUrl:string
  
}