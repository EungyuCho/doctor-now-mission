import { Entity, Column, OneToMany } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Doctor extends CoreEntity {
  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @OneToMany(
    type => Comment,
    comment => comment.doctor
  )
  comments: Comment[];
}
