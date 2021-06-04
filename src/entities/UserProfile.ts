import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity('users_profiles')
class UserProfile {

  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  profile_id: string;
}

export { UserProfile };