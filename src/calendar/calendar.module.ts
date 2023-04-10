import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './cycle.entity';
import { Holiday } from './holiday.entity';
import { User } from '../user/user.entity';
import { Organisation } from '../organisation/organisation.entity';
import { Day } from '../user/day.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cycle, Day, Holiday, Organisation, User]),
  ],
  providers: [CalendarService],
  controllers: [CalendarController],
})
export class CalendarModule {}
