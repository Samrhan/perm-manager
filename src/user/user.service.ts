import { BadRequestException, Injectable } from '@nestjs/common';
import { AddDay, CreateUser } from './user.module';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.enum';
import { Organisation } from '../organisation/organisation.entity';
import { Day } from './day.entity';
import { DayType } from './day-type.enum';
import { FullUser } from './full-user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly userRepository: Repository<User>;
  @InjectRepository(Day) private readonly dayRepository: Repository<Day>;
  @InjectRepository(Organisation)
  private readonly organisationRepository: Repository<Organisation>;

  async createUser(createUser: CreateUser) {
    const user = new User();
    user.lastname = createUser.lastname;
    user.firstname = createUser.firstname;
    user.role = Role[createUser.role] || Role.BASE;
    user.priority = createUser.priority;
    user.organisation = await this.organisationRepository.findOneOrFail({
      name: createUser.organisation,
    });
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }

  async addAvailability(addAvailability: AddDay) {
    return await this.addDay(
      addAvailability,
      addAvailability.favorite
        ? DayType.FAVORITE_AVAILABILITY
        : DayType.AVAILABILITY,
    );
  }

  async addUnavailability(addAvailability: AddDay) {
    return await this.addDay(addAvailability, DayType.UNAVAILABILITY);
  }

  async addDay(addDay: AddDay, dayType: DayType) {
    const day = new Day();
    day.date = addDay.day;

    day.dayType = dayType;
    day.userId = (await this.userRepository.findOneOrFail(addDay.user)).id;

    await this.dayRepository.upsert(day, {
      skipUpdateIfNoValuesChanged: true,
      conflictPaths: ['date', 'userId'],
    });
  }

  async getUserById(id: string): Promise<FullUser> {
    const rawUser = await this.userRepository.findOneOrFail(id, {
      relations: ['organisation', 'day'],
    });
    return UserService.formatUser(rawUser);
  }

  async getAllUsers(organisation: string): Promise<FullUser[]> {
    const users = await this.userRepository.find({
      where: {
        organisation: await this.organisationRepository.findOneOrFail({
          name: organisation,
        }),
      },
      relations: ['organisation', 'day'],
    });
    return users.map(UserService.formatUser);
  }

  private static formatUser(rawUser: User): FullUser {
    const user = {
      ...rawUser,
      favoriteAvailability: rawUser.getFavoriteDays(),
      availability: rawUser.getAvailableDays(),
      unavailability: rawUser.getUnavailableDays(),
    };
    delete user.day;

    return user;
  }
}
