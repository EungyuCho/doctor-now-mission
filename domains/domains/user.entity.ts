import { Entity, Column, OneToMany } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Comment } from "./comment.entity";
import { Board } from "./board.entity";

export enum UserRole {
  USER = "USER",
  Doctor = "Doctor"
}

@Entity()
export class User extends CoreEntity {
  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @OneToMany(
    type => Comment,
    comment => comment.user
  )
  comments: Comment[];

  @OneToMany(
    type => Board,
    board => board.user
  )
  boards: Board[];

  @Column({ type: "enum", enum: UserRole })
  role: UserRole;
}
