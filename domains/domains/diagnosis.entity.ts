import { Entity, Column, ManyToOne } from "typeorm";
import { CoreEntity } from "./core.entity";
import { User } from "./user.entity";

@Entity()
export class Diagnosis extends CoreEntity {
  @Column({ type: "varchar", length: 2500, nullable: false })
  symptom: string;

  @Column({ type: "varchar", length: 2500, nullable: true })
  comment: string;

  @ManyToOne(
    type => User,
    user => user.diagnosis,
    { onDelete: "SET NULL", eager: true, nullable: false }
  )
  user: User;

  @Column({ type: "integer", nullable: false })
  doctorId: number;
}
