import { JwtAuthGuard } from './auth.guard';
import { OrganizationAccessGuard } from './organization-access.guard';
import { RoleAccessGuard } from './role-access.guard';
import { UserAccessGuard } from './user-access.guard';
import { UserTypeAccessGuard } from './user-type-access.guard';

export * from './auth.guard';
export * from './base-access.guard';
export * from './organization-access.guard';
export * from './role-access.guard';
export * from './user-access.guard';
export * from './user-type-access.guard';

export const guards = [
  JwtAuthGuard,
  RoleAccessGuard,
  UserAccessGuard,
  OrganizationAccessGuard,
  UserTypeAccessGuard,
];
