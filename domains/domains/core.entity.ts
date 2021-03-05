import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm";

export class CoreEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;
}