import { Role } from './role.entity';
import { Token } from './token.entity';
import { Adherent, Admin, Client, User } from './user.entity';
import { UserRole } from './user-role.entity';

export * from './role.entity';
export * from './token.entity';
export * from './user.entity';
export * from './user-role.entity';

export const entities = [User, Admin, Client, Adherent, Role, UserRole, Token];
