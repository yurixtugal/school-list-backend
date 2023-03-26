import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Grade } from "./grade.entity";

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  description: string;

  @Column({ nullable: true, type: 'varchar', length: 700 })
  address: string;

  @OneToMany(()=>Grade, (grade)=> grade.school)
  grades: Grade[]
}