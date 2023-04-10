import { Controller, Get, Inject, Param } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  @Inject() calendarService: CalendarService;

  @Get('/:cycle')
  async getCalendar(@Param('cycle') cycle: string) {
    return this.calendarService.getCalendar('LYON', Number(cycle));
  }
}
