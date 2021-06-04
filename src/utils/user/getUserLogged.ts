import { getAllProfiles } from "../profile/getAllProfiles";

import jwt from 'jwt-simple';

type ILoginUser = {
  id: string;
  name: string;
  email: string;
}

export async function getUserLogged(user: ILoginUser) {
  const profiles = await getAllProfiles(user.id);

  const dateNow = Math.floor(Date.now() / 1000);

  const { id, name, email } = user;

  const userInfo = {
    id, name, email,
    profiles,
    iat: dateNow,
    exp: dateNow + (60 * 60 * 24 * 3) // 3 dias
  };

  const authSecret = process.env.APP_AUTH_SECRET;

  if (!authSecret) throw new Error('Problema com a senha.');

  return { ...userInfo, token: jwt.encode(userInfo, authSecret) }
}