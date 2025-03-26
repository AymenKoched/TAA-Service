import { JwtAuthGuard } from './auth.guard';
import { RoleAccessGuard } from './role-access.guard';

export * from './auth.guard';
export * from './base-access.guard';
export * from './role-access.guard';

export const guards = [JwtAuthGuard, RoleAccessGuard];
