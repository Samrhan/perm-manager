import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn('increment')
  id: string;
  @Column({
    type: 'timestamp',
  })
  start: Date;

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => value.toISOString(),
      from: (value: string) => new Date(value),
    },
  })
  end: Date;
}
