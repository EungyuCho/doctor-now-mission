import { Entity, Column, ManyToOne } from "typeorm";
import { CoreEntity } from "./core.entity";
import { User } from "./user.entity";

@Entity()
export class Diagnosis extends CoreEntity {
  @Column({ type: "varchar", length: 2500, nullable: false })
  content: string;

  @ManyToOne(
    type => User,
    user => user.boards,
    { onDelete: "SET NULL", eager: true }
  )
  client: User;

  @ManyToOne(
    type => User,
    user => user.boards,
    { onDelete: "SET NULL", eager: true }
  )
  doctor: User;
}
