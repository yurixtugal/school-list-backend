import { Product } from "src/products/entity/product.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { SchoolList } from "./school-list.entity";
import { School } from "src/schools/entity/school.entity";


@Entity()
export class ProductSchoolList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>Product,(product)=>product.productSchoolLists)
  product: Product

  @ManyToOne(()=>SchoolList,(schoolList)=>schoolList.productSchoolLists)
  schoolList: SchoolList

  @Column({ type: 'int',nullable: true})
  schoolListId: number;

  @Column({ type: 'int',nullable: true})
  productId: number;

  @Column({ type: 'int',nullable: false})
  quantity: number;
}