import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  BaseEntity,
} from 'typeorm';

@Entity()
export abstract class DecoratedEntity extends BaseEntity {
}
