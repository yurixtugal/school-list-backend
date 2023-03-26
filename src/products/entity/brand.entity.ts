import { Product } from "src/products/entity/product.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  description: string;

  @OneToMany(()=>Product, (product)=> product.brand)
  products: Product[]
}