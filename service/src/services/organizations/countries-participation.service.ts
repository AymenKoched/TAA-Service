import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { CountryParticipation } from '../../entities';
import { CountriesParticipationRepository } from '../../repositories';

@Injectable()
export class CountriesParticipationService extends CrudService<CountryParticipation> {
  protected notFoundErrorKey = AuthErrors.OrganizationKpiNotFound;
  protected notFoundErrorMessage = 'The searched organization kpi is not found';

  constructor(private readonly myRepo: CountriesParticipationRepository) {
    super(myRepo);
  }
}
