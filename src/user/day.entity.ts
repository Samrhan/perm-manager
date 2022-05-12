import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { DayType } from './day-type.enum';

@Entity()
export class Day {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.day, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @PrimaryColumn({
    type: 'date',
    transformer: {
      to: (value: Date) =>
        `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`,
      from: (value: string) => new Date(value),
    },
  })
  date: Date;

  @Column({ enum: DayType, name: 'day_type' })
  dayType?: DayType;
}
