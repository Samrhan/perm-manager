import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import { UserModule } from './user/user.module';
import { OrganisationModule } from './organisation/organisation.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [DatabaseModule, UserModule, OrganisationModule, CalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
