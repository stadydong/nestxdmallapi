import { CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class BaseEntities{
  @CreateDateColumn({ name: 'created_at' })

  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}