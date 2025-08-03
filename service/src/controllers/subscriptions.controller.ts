import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import {
  AcceptSubscriptionRequest,
  ClientRequestRequest,
  ClientRequestResponse,
  ClientRequestSearchFilter,
  ConvertResponse,
  RoleAccess,
  SubscriptionResponse,
  UserType,
} from '../common';
import { HasRoleAccess, HasUserTypeAccess } from '../guards';
import { ClientRequestsService, SubscriptionsService } from '../services';

@Controller({ path: 'subscriptions' })
export class SubscriptionsController {
  constructor(
    private readonly subscriptions: SubscriptionsService,
    private readonly clientsRequests: ClientRequestsService,
  ) {}

  @Get()
  @ConvertResponse(SubscriptionResponse)
  public async getSubscriptions() {
    return this.subscriptions.search({});
  }

  @Post('request')
  @ConvertResponse(ClientRequestResponse)
  public async createSubscriptionRequest(
    @Body() payload: ClientRequestRequest,
  ) {
    return this.clientsRequests.create(payload);
  }

  @Get('request')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @HasRoleAccess({ accesses: RoleAccess.ViewSubscriptionRequest })
  @ConvertResponse(ClientRequestResponse)
  public async getSubscriptionRequest(
    @Query() filters: ClientRequestSearchFilter,
  ) {
    return this.clientsRequests.search({
      ...filters,
      expands: ['subscription'],
    });
  }

  @Post('request/:requestId/accept')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @HasRoleAccess({ accesses: RoleAccess.AcceptOrDeclineSubscriptionRequest })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async acceptSubscriptionRequest(
    @Param('requestId') requestId: string,
    @Body() payload: AcceptSubscriptionRequest,
  ) {
    return this.clientsRequests.acceptRequest(requestId, payload);
  }

  @Post('request/:requestId/decline')
  @HasUserTypeAccess({ types: [UserType.Admin] })
  @HasRoleAccess({ accesses: RoleAccess.AcceptOrDeclineSubscriptionRequest })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async decline(@Param('requestId') requestId: string) {
    return this.clientsRequests.deleteById(requestId);
  }
}
