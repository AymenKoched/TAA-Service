import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { AppRequest, AuthErrors, UserResponse } from '../common';
import { UsersService } from '../services';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly users: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AppRequest>();
    const accessToken = request.headers.authorization?.substring(7);
    if (!accessToken) {
      throw new UnauthorizedException(
        AuthErrors.NoTokenProvided,
        'Access token required to access this resource',
      );
    } else {
      try {
        if (!request.user) {
          const payload: UserResponse = this.jwtService.verify(accessToken);
          request.user = await this.getUserDetails(payload.id);
        }

        return true;
      } catch (err) {
        switch (err.name) {
          case 'TokenExpiredError':
            throw new UnauthorizedException(
              AuthErrors.ExpiredToken,
              'Your session has expired. Reauthenticate yourself',
            );
          case 'JsonWebTokenError':
          case 'NotBeforeError':
            throw new UnauthorizedException(
              AuthErrors.InvalidToken,
              'Token you are trying to use is not a valid token',
            );
          default:
            throw err;
        }
      }
    }
  }

  private async getUserDetails(userId: string): Promise<UserResponse> {
    const user = await this.users.getById(userId, {
      search: { expands: ['userRoles.role'] },
    });

    return new UserResponse(
      plainToInstance(UserResponse, instanceToPlain(user)),
    );
  }
}
