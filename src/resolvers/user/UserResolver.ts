import { compareSync } from 'bcrypt';
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { UsersServices } from "../../services/UsersServices";
import { UserFilter, UserInput, UserInfo, UserInfoLogin, UserLoginInput, newUserAdminInput, UpdateUser } from "./UserSchema";
import { UserProfileServices } from "../../services/UserProfilesServices";
import { ProfilesServices } from "../../services/ProfilesServices";
import { getUserLogged } from '../../utils/user/getUserLogged';
import { getAllProfiles } from '../../utils/profile/getAllProfiles';
import validateToken from '../../utils/user/validateToken';
import encryptsPassword from '../../utils/user/encryptsPassword';

@Resolver(of => UserInfo)
export class UserResolver {
  private userService = new UsersServices();
  private profileService = new ProfilesServices();
  private userProfileService = new UserProfileServices();

  @Mutation(() => UserInfo)
  async newUser(@Arg('userInput') userInput: UserInput) {
    const newUserData = { ...userInput };

    const user = await this.userService.create({ newUserData });

    const { id: profile_id } = await this.profileService.findByType('comum');

    const newUserProfileData = {
      user_id: user.id,
      profile_id
    };

    await this.userProfileService.create({ newUserProfileData });
    
    return user;
  }

  @Authorized('admin')
  @Mutation(() => UserInfo)
  async newUserByAdmin(@Arg('newUserAdminInput') adminInput: newUserAdminInput) {
    const newUserData = {
      name: adminInput.name,
      email: adminInput.email,
      password: adminInput.password
    };

    const user = await this.userService.create({ newUserData });

    for (let profile of adminInput.profiles) {
      const profileFound = await this.profileService.findByType(profile.type);

      if (profileFound) {
        const { id: profile_id } = profileFound;

        const { id: user_id } = await this.userService.findByEmail(newUserData.email);
  
        const newUserProfileData = { user_id, profile_id };
  
        await this.userProfileService.create({ newUserProfileData });
      }
    }

    // Se nenhum perfil passado pelo admin por válido
    const profileIds = await this.userProfileService.getAllProfilesIdsByUser(user.id);

    if (!profileIds.length) {
      const { id: profile_id } = await this.profileService.findByType('comum');

      await this.userProfileService.create({
        newUserProfileData: { profile_id, user_id: user.id }
      })
    }

    return user;
  }

  @Authorized('admin')
  @Mutation(() => UserInfo)
  async updateUser(@Arg('updateUserData') updateUserData: UpdateUser) {

    const { filter, newUserData } = updateUserData;
    
    if (!filter || !filter.email) throw new Error('Problema nas informações de filtro.');

    if (newUserData.password) {
      newUserData.password = encryptsPassword(newUserData.password);
    }

    const { profiles: newProfiles, ...newDataForDB } = newUserData;

    const userUpdated = await this.userService.update(filter.email, newDataForDB);

      for (let profile of newProfiles) {
        const profileFound = await this.profileService.findByType(profile.type);
  
        if (profileFound) {
          const { id: profile_id } = profileFound;
  
          const user_id = userUpdated.id;
    
          const newUserProfileData = { user_id, profile_id };
    
          await this.userProfileService.create({ newUserProfileData });
        }
      }

    return userUpdated;
  }

  @Authorized('admin')
  @Mutation(() => UserInfo)
  async deleteUser(@Arg('filter') filter: UserFilter) {
    const userDeleted = await this.userService.delete(filter.email);

    return userDeleted;
  }

  @Query(() => UserInfoLogin)
  async login(@Arg('userLoginInput') userLoginInput: UserLoginInput) {
    const userExists = await this.userService.findByEmail(
      userLoginInput.email
    );

    if (!userExists) throw new Error('E-mail/senha inválidos.');
    
    const isSame = compareSync(
      userLoginInput.password,
      userExists.password
    );

    if (!isSame) throw new Error('E-mail/senha inválidos.');

    const loginInfo = getUserLogged({
      id: userExists.id,
      email: userExists.email,
      name: userExists.name
    });

    return loginInfo;
  }

  @Query(() => UserInfo)
  async validateToken(@Arg('token') token: string) {
    const infoUser = validateToken(token);

    return infoUser;
  }

  @Authorized('admin')
  @Query(() => [UserInfo])
  async users(@Ctx() ctx: any) {
    const users = await this.userService.allUsers();

    return users;
  }

  @Authorized(['admin', 'yourData'])
  @Query(() => UserInfo)
  async user(@Arg('filter') filter: UserFilter) {
    if (!filter) return null;

    if (filter.email) {
      const user = await this.userService.findByEmail(filter.email);

      return user;
    }

    return null;
  }

  @FieldResolver()
  async profiles(@Root() userParent: UserInfo, @Ctx() ctx: any) {

    let profiles = userParent && userParent.profiles;

    if(!profiles) {
      profiles = await getAllProfiles(userParent.id);
    }

    return profiles;
  }
}