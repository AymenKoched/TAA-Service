import { Organization } from './organization.entity';
import {
  OrganizationTag,
  OtherLocationsTag,
  RAndDSiteTag,
} from './organization-tag.entity';
import { Role } from './role.entity';
import { Adherent, Admin, Client, User } from './user.entity';
import { UserRole } from './user-role.entity';
import { UserToken } from './user-token.entity';

export * from './organization.entity';
export * from './organization-tag.entity';
export * from './role.entity';
export * from './user.entity';
export * from './user-role.entity';
export * from './user-token.entity';

export const entities = [
  User,
  Admin,
  Client,
  Adherent,
  Role,
  UserRole,
  UserToken,
  Organization,
  OrganizationTag,
  RAndDSiteTag,
  OtherLocationsTag,
];
