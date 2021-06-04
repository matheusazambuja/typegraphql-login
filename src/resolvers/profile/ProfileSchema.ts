import { Field, InputType, ObjectType } from "type-graphql";
import { UserInfo } from "../user/UserSchema";

@ObjectType('ProfileInfo')
class ProfileInfo {
  @Field(type => String, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  type: string;

  @Field()
  label: string;

  @Field(type => [UserInfo], { nullable: true })
  users?: UserInfo[];
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
class ProfileInputUpdate {
  @Field()
  type: string;
}

export { ProfileInfo, ProfileInput, ProfileFilter, ProfileInputUpdate };