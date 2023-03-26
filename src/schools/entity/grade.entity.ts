import { SchoolList } from "src/school-list/entity/school-list.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { School } from "./school.entity";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  section: string;

  @Column({ type: 'int',nullable: true})
  schoolId: number;

  @Column({ type: 'int',nullable: true})
  year: number;

  @ManyToOne(()=>School,(school)=>school.grades)
  school: School

  @OneToMany(()=>SchoolList, (schoolList)=> schoolList.grade)
  schoolLists: SchoolList[]

}