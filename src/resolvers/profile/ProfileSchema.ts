import { Field, InputType, ObjectType } from "type-graphql";
import { UserData } from "../user/UserSchema";

@ObjectType('ProfileData')
class ProfileData {
  @Field(type => String, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  type: string;

  @Field()
  label: string;

  @Field(type => [UserData], { nullable: true })
  users?: UserData[];
}

@InputType('ProfileInput')
class ProfileInput {
  @Field()
  type: string;
  
  @Field()
  label: string;
}

@InputType('ProfileFilter')
class ProfileFilter {
  @Field()
  type: string;
}

@InputType('ProfileInputUpdate')
class UpdateProfileInput {
  @Field()
  type: string;
}

export { ProfileData, ProfileInput, ProfileFilter, UpdateProfileInput };