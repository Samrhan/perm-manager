import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organisation } from './organisation.entity';
import { CreateOrganisation } from './organisation.module';

@Injectable()
export class OrganisationService {
  @InjectRepository(Organisation)
  private readonly organisationRepository: Repository<Organisation>;

  async createOrganisation(
    createOrganisation: CreateOrganisation,
  ): Promise<Organisation> {
    return await this.organisationRepository.save(createOrganisation);
  }
}
