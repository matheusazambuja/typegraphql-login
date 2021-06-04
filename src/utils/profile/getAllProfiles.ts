import { Profile } from "src/entities/Profile";
import { ProfilesServices } from "../../services/ProfilesServices";
import { UserProfileServices } from "../../services/UserProfilesServices";


export async function getAllProfiles(userId: string) {
  const profiles: Profile[] = [];

  const profileService = new ProfilesServices();
  const userProfileService = new UserProfileServices();

  const profilesIds = await userProfileService
    .getAllProfilesIdsByUser(userId);

  for (let profileId of profilesIds) {
    const profile = await profileService.findById(profileId);

    profiles.push(profile);
  }

  return profiles;
}