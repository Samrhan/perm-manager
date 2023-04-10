import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Day } from './day.entity';
import { Organisation } from '../organisation/organisation.entity';

export interface CreateUser {
  organisation: string;
  lastname: string;
  firstname: string;
  priority?: number;
  role?: string;
}

export interface AddDay {
  user: string;
  day: string;
  favorite: boolean;
}

@Module({
  imports: [TypeOrmModule.forFeature([User, Day, Organisation])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
