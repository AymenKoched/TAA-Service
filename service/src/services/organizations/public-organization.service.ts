import { Injectable } from '@nestjs/common';

import {
  ClientResponse,
  OrganizationFieldsAccess,
  RequestContext,
  SUBSCRIPTION_STANDARD,
} from '../../common';
import { AuthService } from '../auth';
import { SubscriptionsService } from '../users';
import { OrganizationsService } from './organizations.service';

@Injectable()
export class PublicOrganizationService {
  constructor(
    private readonly auth: AuthService,
    private readonly orgs: OrganizationsService,
    private readonly subscriptions: SubscriptionsService,
  ) {}

  async getOrganizationGeneralById(organizationId: string) {
    const dto = await this.orgs.getOrganizationGeneralById(organizationId);
    const hiddenFields = await this.getHiddenFields();
    return this.applyHiddenFields(dto, hiddenFields);
  }

  async getOrganizationProductsById(organizationId: string) {
    const dto = await this.orgs.getOrganizationProductsById(organizationId);
    const hiddenFields = await this.getHiddenFields();
    return this.applyHiddenFields(dto, hiddenFields);
  }

  async getOrganizationHumanResourcesById(organizationId: string) {
    const dto = await this.orgs.getOrganizationHumanResourcesById(
      organizationId,
    );
    const hiddenFields = await this.getHiddenFields();
    return this.applyHiddenFields(dto, hiddenFields);
  }

  async getOrganizationRevenuesById(organizationId: string) {
    const dto = await this.orgs.getOrganizationRevenuesById(organizationId);
    const hiddenFields = await this.getHiddenFields();
    return this.applyHiddenFields(dto, hiddenFields);
  }

  async getOrganizationExtrasById(organizationId: string) {
    const dto = await this.orgs.getOrganizationExtrasById(organizationId);
    const hiddenFields = await this.getHiddenFields();
    return this.applyHiddenFields(dto, hiddenFields);
  }

  async getOrganizationOthersById(organizationId: string) {
    const dto = await this.orgs.getOrganizationOthersById(organizationId);
    const hiddenFields = await this.getHiddenFields();
    return this.applyHiddenFields(dto, hiddenFields);
  }

  async getOrganizationOpportunitiesById(organizationId: string) {
    const dto = await this.orgs.getOrganizationOpportunitiesById(
      organizationId,
    );
    const hiddenFields = await this.getHiddenFields();
    return this.applyHiddenFields(dto, hiddenFields);
  }

  private async getHiddenFields(): Promise<OrganizationFieldsAccess[]> {
    const userId = RequestContext.currentContext().userId;
    let hiddenFields: OrganizationFieldsAccess[];

    if (userId) {
      const userDetails = await this.auth.getUserDetailsById(userId);
      const client = new ClientResponse(userDetails.user);
      hiddenFields =
        client.activeSubscription?.subscription?.organizationHiddenFields ?? [];
    } else {
      const standard = await this.subscriptions.findOne({
        name: SUBSCRIPTION_STANDARD,
      });
      hiddenFields = standard.organizationHiddenFields;
    }

    return hiddenFields;
  }

  private applyHiddenFields<T extends object>(
    dto: T,
    hiddenFields: OrganizationFieldsAccess[],
  ): T {
    const result = { ...dto } as any;

    hiddenFields.forEach((fieldKey) => {
      const key = String(fieldKey);
      const parts = key.split('_');

      if (parts.length === 1) {
        delete result[key];
      } else {
        let target: any = result;
        for (let i = 0; i < parts.length - 1; i++) {
          if (target == null) break;
          target = target[parts[i]];
        }
        const leaf = parts[parts.length - 1];
        if (Array.isArray(target)) {
          target.forEach((item: any) => {
            if (item != null) {
              delete item[leaf];
            }
          });
        } else if (target != null && typeof target === 'object') {
          delete target[leaf];
        }
      }
    });

    return result as T;
  }
}
