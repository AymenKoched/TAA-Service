export enum SuperAdminRoleAccess {
  SuperAdminAccess = 'super_admin_access',
}

export enum OrganizationAccess {
  CreateOrg = 'create_org',
  UpdateOrg = 'update_org',
  DeleteOrg = 'delete_org',
  ViewOrg = 'view_org',
}

export enum UserAccess {
  CreateUser = 'create_user',
  UpdateUser = 'update_user',
  DeleteUser = 'delete_user',
  ViewUser = 'view_user',
}

export enum RoleAccess {
  SuperAdminAccess = SuperAdminRoleAccess.SuperAdminAccess,

  CreateOrg = OrganizationAccess.CreateOrg,
  UpdateOrg = OrganizationAccess.UpdateOrg,
  DeleteOrg = OrganizationAccess.DeleteOrg,
  ViewOrg = OrganizationAccess.ViewOrg,

  CreateUser = UserAccess.CreateUser,
  UpdateUser = UserAccess.UpdateUser,
  DeleteUser = UserAccess.DeleteUser,
  ViewUser = UserAccess.ViewUser,
}
