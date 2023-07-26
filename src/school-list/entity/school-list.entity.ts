import { Grade } from "src/schools/entity/grade.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { ProductSchoolList } from "./product-list-school.entity";


@Entity()
export class SchoolList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  description: string;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  file: string;


  @Column({ type: 'int',nullable: true})
  gradeId: number

  @Column({ type: 'int',nullable: true})
  year: number

  @ManyToOne(()=>Grade,(grade)=>grade.schoolLists)
  grade: Grade

  @OneToMany(()=>ProductSchoolList, (productSchoolLists)=> productSchoolLists.schoolList)
  productSchoolLists: ProductSchoolList[]
}