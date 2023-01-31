import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, UpdateDateColumn } from "typeorm";
import { CarEntities } from "./mall/car.entities";
import { ProductEntities } from "./mall/product.entities";

@Entity()
export class BaseEntities{
  @CreateDateColumn({ name: 'created_at' })

  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
