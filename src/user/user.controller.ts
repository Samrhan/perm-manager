import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AddDay, CreateUser } from './user.module';

@Controller('user')
export class UserController {
  @Inject() private userService: UserService;

  @Post()
  async createUser(@Body() createUser: CreateUser) {
    return this.userService.createUser(createUser);
  }

  @Delete()
  async deleteUser(@Body('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get()
  async getUserById(@Body('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('all')
  async getAllUsers(@Body('organisation') organisation: string) {
    return await this.userService.getAllUsers(organisation);
  }

  @Put('availability')
  async addAvailability(
    @Body() addAvailability: AddDay,
    @Query('favorite') favorite?: string,
  ) {
    return this.userService.addAvailability(
      addAvailability,
      !(favorite === 'false' || favorite === '0' || favorite === undefined),
    );
  }

  @Put('unavailability')
  async addUnavailability(@Body() addAvailability: AddDay) {
    return this.userService.addUnavailability(addAvailability);
  }
}
