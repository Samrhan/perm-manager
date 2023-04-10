import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cycle {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => value.toISOString(),
      from: (value: string) => value,
    },
  })
  start: string;

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => value.toISOString(),
      from: (value: string) => value,
    },
  })
  end: string;
}
