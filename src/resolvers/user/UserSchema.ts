import { Field, InputType, ObjectType } from "type-graphql";
import { ProfileInfo, ProfileInputUpdate } from "../profile/ProfileSchema";


@InputType('UserDataInput')
class UserDataInput {
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
class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType('UpdateUserDataInput')
class UpdateUserDataInput {
  @Field()
  name?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field(type => [ProfileInputUpdate])
  profiles?: ProfileInputUpdate[];
}

@InputType('NewUserAdminInput')
class NewUserAdminInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(type => [NewUserAdminInputProfiles])
  profiles: NewUserAdminInputProfiles[];
}

@InputType('NewUserAdminInputProfiles')
class NewUserAdminInputProfiles {
  @Field()
  type: string;
}

@ObjectType('UserData')
class UserData {
  @Field(type => String)
  id?: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(type => [ProfileInfo])
  profiles?: ProfileInfo[];
}

@InputType('UpdateUserInput')
class UpdateUserInput {
  @Field()
  filter: UserFilter;

  @Field()
  newUserData: UpdateUserDataInput;
}

@ObjectType('LoginUserData')
class LoginUserData {
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

export {
  UserData,
  UserDataInput, 
  UserFilter,
  LoginUserData,
  LoginUserInput,
  NewUserAdminInput,
  UpdateUserInput,
  UpdateUserDataInput
};