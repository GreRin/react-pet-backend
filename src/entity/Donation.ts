import { Entity, Column as TypeColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'donations' })
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TypeColumn('varchar', { length: 225 })
  toFund: string;

  @TypeColumn('decimal')
  amount: number;

  @TypeColumn('date')
  date: Date;

  @TypeColumn('varchar', { length: 225 })
  fromOrganization: string;

  static toResponse(donation?: Partial<Donation>): Partial<Donation> | null {
    if (!donation) return null;
    const { id, toFund, amount, date, fromOrganization } = donation;
    return { id, toFund, amount, date, fromOrganization };
  }
}
