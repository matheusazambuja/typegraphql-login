import { EntityRepository, Repository } from "typeorm";
import { UserProfile } from "../entities/UserProfile";

@EntityRepository(UserProfile)
class UserProfileRepository extends Repository<UserProfile> {}

export { UserProfileRepository }