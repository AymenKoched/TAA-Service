import { BadRequestException, Injectable } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { randomBytes } from 'crypto';

import {
  AuthErrors,
  CrudService,
  UserTokenRequest,
  UserTokenResponse,
  UserTokenType,
} from '../../common';
import { UserToken } from '../../entities';
import { UserTokensRepository } from '../../repositories';

@Injectable()
export class UserTokensService extends CrudService<UserToken> {
  protected notFoundErrorKey = AuthErrors.TokenNotFound;
  protected notFoundErrorMessage = 'The searched token is not found';

  constructor(private userTokens: UserTokensRepository) {
    super(userTokens);
  }

  async createUserToken(request: UserTokenRequest) {
    const token = await this.generateRandomToken(48);

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    return this.create({
      userId: request.userId,
      token,
      expirationDate,
      type: request.type,
    });
  }

  async verifyTokenValidity(
    token: string,
    type: UserTokenType,
  ): Promise<UserTokenResponse> {
    const userToken = await this.findOne(
      { token },
      { search: { expands: ['user'] } },
    );

    if (!this.isValid(userToken, type)) {
      throw new BadRequestException(
        AuthErrors.LinkExpired,
        'The link has expired',
      );
    }

    return new UserTokenResponse(
      plainToInstance(UserTokenResponse, instanceToPlain(userToken)),
    );
  }

  private isValid(userToken: UserToken, type: UserTokenType): boolean {
    if (userToken.type !== type) {
      return false;
    }
    const date = new Date();
    if (!userToken.expirationDate) {
      return true;
    }
    const tokenAge = userToken.expirationDate.getTime() - date.getTime();
    return tokenAge > 0;
  }

  private async generateRandomToken(bytesSize: number): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(bytesSize, function (err, buffer) {
        if (err) {
          reject(err);
        } else {
          const token = buffer.toString('hex');
          resolve(token);
        }
      });
    });
  }
}
