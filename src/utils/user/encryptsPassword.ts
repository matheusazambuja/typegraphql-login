import { genSaltSync, hashSync } from "bcrypt";

function encryptsPassword(password: string): string {
  const salt = genSaltSync();
  password = hashSync(password, salt);

  return password;
}

export default encryptsPassword;