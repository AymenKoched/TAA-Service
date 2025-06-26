import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ConvertResponse,
  UserReclamationRequest,
  UserReclamationResponse,
  UserReclamationsSearchFilter,
  UserReclamationState,
  UserReclamationStateRequest,
  UserReclamationUpdateRequest,
  UserResponse,
  UserType,
} from '../common';
import { CurrentUser } from '../decorators';
import { HasUserTypeAccess, JwtAuthGuard } from '../guards';
import { UserReclamationsService } from '../services';

@Controller({ path: 'reclamations' })
@UseGuards(JwtAuthGuard)
export class ReclamationsController {
  constructor(private readonly reclamations: UserReclamationsService) {}

  @Get()
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @ConvertResponse(UserReclamationResponse)
  public async getReclamations(@Query() filters: UserReclamationsSearchFilter) {
    return this.reclamations.search(filters);
  }

  @Post()
  @HasUserTypeAccess({ types: [UserType.Adherent] })
  @ConvertResponse(UserReclamationResponse)
  public async createReclamation(
    @CurrentUser() user: UserResponse,
    @Body() payload: UserReclamationRequest,
  ) {
    return this.reclamations.create({
      ...payload,
      state: UserReclamationState.Pending,
      adherentId: user.id,
    });
  }

  @Put(':reclamationId')
  @HasUserTypeAccess({ types: [UserType.Adherent, UserType.Admin] })
  @ConvertResponse(UserReclamationResponse)
  public async updateReclamation(
    @Param('reclamationId') reclamationId: string,
    @Body() payload: UserReclamationUpdateRequest,
    @CurrentUser() user: UserResponse,
  ) {
    return this.reclamations.updateReclamation(user, reclamationId, payload);
  }

  @Put(':reclamationId/state')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @ConvertResponse(UserReclamationResponse)
  public async updateReclamationState(
    @Param('reclamationId') reclamationId: string,
    @Body() payload: UserReclamationStateRequest,
  ) {
    return this.reclamations.changeState(reclamationId, payload);
  }
}
