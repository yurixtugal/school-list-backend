import { Brand } from "./brand.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { ProductSchoolList } from "src/school-list/entity/product-list-school.entity";



@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int',nullable: true})
  brandId: number;

  @ManyToOne(()=>Brand,(brand)=>brand.products)
  brand: Brand

  @OneToMany(()=>ProductSchoolList, (productSchoolLists)=> productSchoolLists.product)
  productSchoolLists: ProductSchoolList[]
}