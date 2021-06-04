import { Profile } from "../entities/Profile";
import { ProfileRepository } from "../repositories/ProfileRepository";
import { getCustomRepository } from "typeorm";

type INewProfileData = {
  newProfileData: Profile;
}

export class ProfilesServices {
  private profileRepository = new ProfileRepository();

  constructor() {
    this.profileRepository = getCustomRepository(ProfileRepository);
  }

  async create({ newProfileData }: INewProfileData) {
    const profileExists = await this.profileRepository.findOne({
      type: newProfileData.type
    });

    if (profileExists) throw new Error('Perfil já cadastrado.');

    await this.profileRepository.insert(newProfileData);
    
    const profileCreated = await this.findByType(newProfileData.type);

    return profileCreated;
  }

  async findByType(type: string) {
    const profile = await this.profileRepository.findOne({
      type
    });

    return profile;
  }

  async findById(id: string) {
    const profile = await this.profileRepository.findOne({
      id
    })

    return profile;
  }

  async allProfiles() {
    const profiles = await this.profileRepository.find();
    
    return profiles;
  }
}