import User from "./user/userModel";
import Role from "./user/roleModel";

const UserModel = User;
const RoleModel = Role;

UserModel.associate({ Role: RoleModel });
RoleModel.associate({ User: UserModel });

export { UserModel, RoleModel };
