import { Entity, Column, OneToMany, ManyToOne, RelationId } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class Board extends CoreEntity {
  @Column({ type: "varchar", length: 50, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 2500, nullable: false })
  content: string;

  @ManyToOne(
    type => User,
    user => user.boards,
    { onDelete: "SET NULL", eager: true }
  )
  user: User;

  @RelationId((board: Board) => board.user)
  userId: number;

  @OneToMany(
    type => Comment,
    comments => comments.board
  )
  comments: Comment[];
}
