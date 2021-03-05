import { Entity, Column, ManyToOne } from "typeorm";
import { CoreEntity } from "./core.entity";
import { User } from "./user.entity";
import { Doctor } from "./doctor.entity";
import { Board } from "./board.entity";

@Entity()
export class Comment extends CoreEntity {
  @ManyToOne(
    type => Board,
    board => board.comments,
    { onDelete: "SET NULL", eager: true }
  )
  board: Board;

  @Column({ type: "varchar", length: 50, nullable: false })
  content: string;

  @ManyToOne(
    type => User,
    user => user.comments,
    { nullable: true, onDelete: "SET NULL", eager: true }
  )
  user: User;

  @ManyToOne(
    type => User,
    user => user.comments,
    { nullable: true, onDelete: "SET NULL", eager: true }
  )
  doctor: Doctor;
}
