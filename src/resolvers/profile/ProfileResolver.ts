import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { ProfilesServices } from "../../services/ProfilesServices";
import { ProfileInfo, ProfileInput, ProfileFilter } from "../profile/ProfileSchema";
import { getAllUsers } from "../../utils/user/getAllUsers";

@Resolver(of => ProfileInfo)
export class ProfileResolver {
  private profileService = new ProfilesServices();

  @Authorized('admin')
  @Mutation(() => ProfileInfo)
  async newProfile(@Arg('profileInput') profileInput: ProfileInput) {
    const newProfileData = { ...profileInput };
    const profile = await this.profileService.create({ newProfileData });

    return profile;
  }

  @Authorized('admin')
  @Query(() => [ProfileInfo])
  async profiles() {
    const profiles = await this.profileService.allProfiles();

    return profiles;
  }

  @Authorized('admin')
  @Query(() => ProfileInfo)
  async profile(@Arg('filter') filter: ProfileFilter) {
    if (!filter) return null;

    if (filter.type) {
      const profile = await this.profileService.findByType(filter.type);

      return profile;
    }

    return null;
  }

  @FieldResolver()
  async users(@Root() profileParent: ProfileInfo) {
    const users = await getAllUsers(profileParent.id);

    return users;
  }
}
