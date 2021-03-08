import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { CoreEntity } from "./core.entity";
import { Comment } from "./comment.entity";
import { Board } from "./board.entity";
import * as bcrypt from "bcryptjs";
import { Diagnosis } from "./diagnosis.entity";

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

  @OneToMany(
    type => Diagnosis,
    diagnosis => diagnosis.user
  )
  diagnosis: Diagnosis[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
    }
  }
}
