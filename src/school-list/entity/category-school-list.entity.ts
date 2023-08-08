import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { SchoolList } from "./school-list.entity";
import { DetailProductCategory } from "./detail-product-category.entity";


@Entity()
export class CategorySchoolList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SchoolList, (schoolList) => schoolList.categorySchoolLists)
  schoolList: SchoolList;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  name: string;

  @OneToMany(()=>DetailProductCategory, (detailProductCategory)=> detailProductCategory.categorySchoolList)
  detailProductCategory: DetailProductCategory[]

  @Column({ type: 'int',nullable: true})
  schoolListId: number;

}