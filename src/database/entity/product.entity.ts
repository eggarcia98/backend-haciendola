import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
export class Products {
    @PrimaryGeneratedColumn({ type: "bigint" })
    sku!: number;

    @Column({ type: "varchar", length: 255 })
    handle!: string;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "varchar", length: 2048 })
    description!: string;

    @Column({ type: "double" })
    grams!: string;

    @Column({ type: "int" })
    stock!: number;

    @Column({ type: "int" })
    price!: number;

    @Column({ type: "int" })
    compare_price!: number;

    @Column({ type: "double" })
    barcode!: number;
}
