import { EntityRepository, Repository } from "typeorm";
import { Profile } from "../entities/Profile";

@EntityRepository(Profile)
class ProfileRepository extends Repository<Profile> {}

export { ProfileRepository }