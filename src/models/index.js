import { UserModel } from "./user/userModel";
import { RoleModel } from "./user/roleModel";

UserModel.associate({ Role: RoleModel });
RoleModel.associate({ User: UserModel });

// eslint-disable-next-line import/prefer-default-export
export { UserModel, RoleModel };
