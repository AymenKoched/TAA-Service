import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { Token } from '../../entities';
import { TokensRepository } from '../../repositories';

@Injectable()
export class TokensService extends CrudService<Token> {
  protected notFoundErrorKey = AuthErrors.TokenNotFound;
  protected notFoundErrorMessage = 'The searched token is not found';

  constructor(private tokens: TokensRepository) {
    super(tokens);
  }
}
