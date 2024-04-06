import { 
    BaseEntity, 
    PrimaryGeneratedColumn, 
    Column,
    Entity, 
} from 'typeorm';


@Entity()
export class Dog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
  
    @Column()
    age: number
}

