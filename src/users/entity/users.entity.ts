import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 500 })
  password: string;

  @Column({ type: 'varchar', length: 500 })
  name: string;
  
  @Column({ type: 'varchar', length: 500 })
  lastName: string;
}