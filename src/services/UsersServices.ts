import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import encryptsPassword from "../utils/user/encryptsPassword";
import { getCustomRepository, Repository } from "typeorm";
import { getAllProfiles } from "../utils/profile/getAllProfiles";
import { UserDataUpdateInput } from "src/resolvers/user/UserSchema";

type INewUserData = {
  newUserData: User;
}

function verifyNewUserData(newUserData: User): void {

  if(!newUserData) throw new Error('Dados não adicionados.');

  const {
    email, password, name
  } = newUserData;

  if (!email) throw new Error('E-mail não informado.');
  if (!password) throw new Error('Senha não informada.');
  if (!name) throw new Error('Nome não informado.');
}

export class UsersServices {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create({ newUserData }: INewUserData) {
    const userExists = await this.userRepository.findOne({
      email: newUserData.email
    });

    if (userExists) throw new Error('E-mail já cadastrado');

    verifyNewUserData(newUserData);

    newUserData.password = encryptsPassword(newUserData.password);

    await this.userRepository.insert(newUserData);

    const newUserCreated = this.findByEmail(newUserData.email);

    return newUserCreated;
  }

  async update(filterEmail: string, updateUserData: UserDataUpdateInput) {
    const userExists = await this.findByEmail(filterEmail);

    if (!userExists) throw new Error('Usuário não cadastrado.');

    await this.userRepository.update({ email: filterEmail }, updateUserData);

    const userUpdated = await this.userRepository.findOne({
      id: userExists.id
    });

    return userUpdated;
  }

  async delete(email: string) {
    const userWillBeDeleted = await this.findByEmail(email);

    if (!userWillBeDeleted) throw new Error('Usuário não cadastrado.');

    const profiles = await getAllProfiles(userWillBeDeleted.id);

    await this.userRepository.delete({
      email: userWillBeDeleted.email
    });

    return { ...userWillBeDeleted, profiles };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      email
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({
      id
    });

    return user;
  }

  async allUsers() {
    const users = await this.userRepository.find();

    return users;
  }
}