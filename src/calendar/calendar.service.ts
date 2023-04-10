import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Day } from '../user/day.entity';
import { Organisation } from '../organisation/organisation.entity';
import { DayType } from '../user/day-type.enum';
import { Cycle } from './cycle.entity';
import { ICalendar } from './interface/calendar.interface';
import { Holiday } from './holiday.entity';

@Injectable()
export class CalendarService {
  @InjectRepository(User) userRepository: Repository<User>;
  @InjectRepository(Day) dayRepository: Repository<Day>;
  @InjectRepository(Holiday) holidayRepository: Repository<Holiday>;
  @InjectRepository(Organisation)
  organisationRepository: Repository<Organisation>;

  @InjectRepository(Cycle) cycleRepository: Repository<Cycle>;

  async getCalendar(organisationId: string, periode: number) {
    const organisation = await this.organisationRepository.findOneOrFail({
      name: organisationId,
    });

    const cycle = await this.cycleRepository.findOneOrFail(periode);

    const calendar: ICalendar[] = [];
    const holidays = await this.holidayRepository.find({
      where: {
        start: MoreThanOrEqual(cycle.start),
      },
    });

    const vacations: string[] = [];
    for (const holiday of holidays) {
      for (
        let day = new Date(holiday.start);
        day <= holiday.end;
        day.setDate(day.getDate() + 1)
      ) {
        vacations.push(day.toISOString().split('T')[0]);
      }
    }

    for (
      let day = new Date(cycle.start);
      day <= new Date(cycle.end);
      day.setDate(day.getDate() + 1)
    ) {
      if (day.getDay() !== 0 && day.getDay() !== 6) {
        const dayString = day.toISOString().split('T')[0];
        if (!vacations.includes(dayString)) {
          calendar.push({ date: dayString, etape: 0 });
        }
      }
    }

    const users = await this.userRepository.find({
      where: {
        organisation,
      },
      relations: ['day'],
    });

    const favoriteAvailabilities = await this.dayRepository.query(
      `SELECT u.id, d.date::DATE AS date, asked.total, total.total
       FROM "user" AS u
                INNER JOIN day AS d
                           ON d.user_id = u.id AND d.day_type = 'FAVORITE_AVAILABILITY'
                INNER JOIN cycle
                           ON cycle.id = $1
                JOIN (SELECT user_id, COUNT(*) total
                      FROM day
                               INNER JOIN cycle
                                          ON cycle.id = $1
                      WHERE date >= cycle.start
                        AND date <= cycle.end
                        AND day_type = 'FAVORITE_AVAILABILITY'
                      GROUP BY user_id) AS total ON total.user_id = d.user_id
                JOIN (SELECT COUNT(*) total, date
                      FROM day
                               INNER JOIN cycle
                                          ON cycle.id = $1
                      WHERE date >= cycle.start
                        AND date <= cycle.end
                        AND day_type = 'FAVORITE_AVAILABILITY'
                      GROUP BY date) AS asked ON asked.date = d.date

       WHERE u.organisation_id = $2
         AND d.date >= cycle.start
         AND d.date <= cycle.end
       ORDER BY u.priority DESC, total.total, asked.total, u.id;`,
      [periode, organisation.id],
    );

    const attributed_users: string[] = [];

    for (const dispo of favoriteAvailabilities) {
      for (const calendarDay of calendar) {
        if (
          new Date(dispo.date).getTime() ===
            new Date(calendarDay.date).getTime() &&
          !calendarDay.attribution &&
          !attributed_users.includes(dispo.id)
        ) {
          calendarDay.attribution = dispo.id;
          calendarDay.etape = 1;
          attributed_users.push(dispo.id);
        }
      }
    }

    const availabilities = await this.dayRepository.find({
      where: {
        dayType: DayType.AVAILABILITY,
        user: {
          organisation,
        },
      },
      relations: ['user'],
    });

    for (const dispo of availabilities) {
      for (const calendarDay of calendar) {
        if (
          new Date(dispo.date).getTime() ===
            new Date(calendarDay.date).getTime() &&
          !calendarDay.attribution &&
          !attributed_users.includes(dispo.userId)
        ) {
          calendarDay.attribution = dispo.userId;
          calendarDay.etape = 2;
          attributed_users.push(dispo.userId);
          break;
        }
      }
    }

    for (const day of calendar) {
      if (!day.attribution) {
        for (const people of users) {
          if (!attributed_users.includes(people.id)) {
            if (!people.getUnavailableDays().includes(day.date)) {
              day.attribution = people.id;
              day.etape = 3;
              attributed_users.push(people.id);
              break;
            }
          }
        }
      }
    }

    for (const day of calendar) {
      if (day.attribution) {
        const user = await this.userRepository.findOne(day.attribution);
        day.attribution = user.firstname + ' ' + user.lastname;
      }
    }

    return calendar;
  }
}
