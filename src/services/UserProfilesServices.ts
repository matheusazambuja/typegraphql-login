import { UserProfileRepository } from "../repositories/UserProfileRepository";
import { getCustomRepository, Repository } from "typeorm";
import { UserProfile } from "../entities/UserProfile";

type INewUserProfileData = {
  newUserProfileData: UserProfile;
}

export class UserProfileServices {
  private userProfileRepository: Repository<UserProfile>;

  constructor() {
    this.userProfileRepository = getCustomRepository(UserProfileRepository);
  }

  async create({ newUserProfileData }: INewUserProfileData) {
    const relationUserProfileExists = await this.userProfileRepository.findOne({
      user_id: newUserProfileData.user_id,
      profile_id: newUserProfileData.profile_id
    });

    if (relationUserProfileExists) return;

    await this.userProfileRepository.insert({
      user_id: newUserProfileData.user_id,
      profile_id: newUserProfileData.profile_id
    });
  }

  async getAllProfilesIdsByUser(id: string) {
    const relationsByUserId = await this.userProfileRepository.find({
      user_id: id
    });

    const profilesIds = relationsByUserId.map(relation => relation.profile_id);

    return profilesIds;
  }

  async getAllUsersIdsByProfile(id: string) {
    const relationsByProfileId = await this.userProfileRepository.find({
      profile_id: id
    });

    const usersIds = relationsByProfileId.map(relation => relation.user_id);

    return usersIds;
  }
}