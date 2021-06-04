import { Field, InputType, ObjectType } from "type-graphql";
import { ProfileInfo, ProfileInputUpdate } from "../profile/ProfileSchema";


@InputType('UserInput')
class UserInput {
  @Field()
  name: string;

  @Field()
  email: string;
  
  @Field()
  password: string;
}

@InputType('UserFilter')
class UserFilter {
  @Field({ nullable: true })
  email?: string;
}

@InputType('UserLoginInput')
class UserLoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType('UserUpdateInput')
class UserUpdateInput {
  @Field()
  name?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field(type => [ProfileInputUpdate])
  profiles?: ProfileInputUpdate[];
}

@InputType('newUserAdminInput')
class newUserAdminInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(type => [newUserAdminInputProfiles])
  profiles: newUserAdminInputProfiles[];
}

@InputType('newUserAdminInputProfiles')
class newUserAdminInputProfiles {
  @Field()
  type: string;
}

@ObjectType('UserInfo')
class UserInfo {
  @Field(type => String)
  id?: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(type => [ProfileInfo])
  profiles?: ProfileInfo[];
}

@InputType('UpdateUser')
class UpdateUser {
  @Field()
  filter: UserFilter;

  @Field()
  newUserData: UserUpdateInput;
}

@ObjectType('UserInfoLogin')
class UserInfoLogin {
  @Field(type => String)
  id?: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  token: string;

  @Field(type => [ProfileInfo])
  profiles?: ProfileInfo[];
}

export { UserInput, UserFilter, UserInfo, UserInfoLogin, UserLoginInput, newUserAdminInput, UpdateUser, UserUpdateInput };