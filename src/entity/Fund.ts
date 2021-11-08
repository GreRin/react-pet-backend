import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'fund'})
export class Fund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 225})
  name: string;

  @Column('decimal')
  totalFunds: number;

  @Column('date')
  createdAt: Date;

  @Column('date')
  updatedAt: Date;

  // @OneToMany<Task>(() => Task, (task: Task): Id => task.userId as Id, { cascade: true })
  // tasks: Task[];

  static toResponse(fund?: Partial<Fund>): Partial<Fund> | undefined {
    if (!fund) return undefined;
    const { id, name, totalFunds, createdAt, updatedAt} = fund;
    return { id, name, totalFunds, createdAt, updatedAt };
  }
}
