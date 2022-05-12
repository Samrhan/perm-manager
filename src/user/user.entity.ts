import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organisation } from '../organisation/organisation.entity';
import { Role } from './role.enum';
import { Day } from './day.entity';
import { DayType } from './day-type.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organisation)
  @JoinColumn({ name: 'organisation_id' })
  organisation: Organisation;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column({ default: 0 })
  priority: number;

  @Column({ enum: Role, default: Role.BASE })
  role: Role;

  @OneToMany(() => Day, (a) => a.user)
  day: Day[];

  getAvailableDays(): Date[] {
    return this.day
      ?.filter((a) => a.dayType === DayType.AVAILABILITY)
      .map((d) => d.date);
  }

  getUnavailableDays(): Date[] {
    return this.day
      ?.filter((a) => a.dayType === DayType.UNAVAILABILITY)
      .map((d) => d.date);
  }

  getFavoriteDays(): Date[] {
    return this.day
      ?.filter((a) => a.dayType === DayType.FAVORITE_AVAILABILITY)
      .map((d) => d.date);
  }
}
