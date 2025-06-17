import { AdminAccessGuard } from './admin-access.guard';
import { JwtAuthGuard } from './auth.guard';
import { OrganizationAccessGuard } from './organization-access.guard';
import { RoleAccessGuard } from './role-access.guard';
import { UserAccessGuard } from './user-access.guard';

export * from './admin-access.guard';
export * from './auth.guard';
export * from './base-access.guard';
export * from './organization-access.guard';
export * from './role-access.guard';
export * from './user-access.guard';

export const guards = [
  JwtAuthGuard,
  RoleAccessGuard,
  UserAccessGuard,
  OrganizationAccessGuard,
  AdminAccessGuard,
];
