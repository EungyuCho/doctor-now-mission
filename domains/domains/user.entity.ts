import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Comment } from "./comment.entity";
import { Board } from "./board.entity";
import * as bcrypt from "bcrypt";

export enum UserRole {
  USER = "USER",
  DOCTOR = "DOCTOR"
}

@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @Column({ type: "enum", enum: UserRole })
  role: UserRole;

  @Column()
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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    const ok = await bcrypt.compare(aPassword, this.password);
    return ok;
  }
}
