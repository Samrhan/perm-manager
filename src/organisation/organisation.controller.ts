import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { CreateOrganisation } from './organisation.module';
import { Organisation } from './organisation.entity';

@Controller('organisation')
export class OrganisationController {
  @Inject() private organisationService: OrganisationService;

  @Post()
  async createOrganisation(
    @Body() createOrganisation: CreateOrganisation,
  ): Promise<Organisation> {
    return await this.organisationService.createOrganisation(
      createOrganisation,
    );
  }
}
