import {
  Entity,
  Column as TypeColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Id } from '../types';

@Entity({ name: 'fund' })
export class Fund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TypeColumn('varchar', { length: 225 })
  name: string;

  @TypeColumn('decimal')
  totalFunds: number;

  @TypeColumn('date')
  createdAt: Date;

  @TypeColumn('date')
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @TypeColumn('uuid', { name: 'userIdId', nullable: true })
  userId: Id | null;

  static toResponse(fund?: Partial<Fund>): Partial<Fund> | undefined {
    if (!fund) return undefined;
    const { id, name, totalFunds, createdAt, updatedAt } = fund;
    return { id, name, totalFunds, createdAt, updatedAt };
  }
}
