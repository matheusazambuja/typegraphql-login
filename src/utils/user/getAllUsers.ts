import { UserProfileServices } from "../../services/UserProfilesServices";
import { UsersServices } from "../../services/UsersServices";

export async function getAllUsers(profileId: string) {
  const users = [];

  const userService = new UsersServices();
  const userProfileService = new UserProfileServices();

  const usersIds = await userProfileService
    .getAllUsersIdsByProfile(profileId);
  
  for (let userId of usersIds) {
    const user = await userService.findById(userId);

    users.push(user);
  }

  return users;
}