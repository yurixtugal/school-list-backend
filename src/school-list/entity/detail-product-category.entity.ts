import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { CategorySchoolList } from "./category-school-list.entity";


@Entity()
export class DetailProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CategorySchoolList, (categorySchoolList) => categorySchoolList.detailProductCategory)
  categorySchoolList: CategorySchoolList;

  @Column({ type: 'int',nullable: true})
  categorySchoolListId: number;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  nameProduct: string;

  @Column({ type: 'int',nullable: false})
  quantity: number;

}