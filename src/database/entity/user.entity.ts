import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
export class Users {
    @PrimaryGeneratedColumn({ type: "int" })
    id!: number;

    @Column({ type: "varchar", length: 255 })
    user!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;
}
