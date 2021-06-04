import { AuthChecker } from "type-graphql";

import { UsersServices } from "../services/UsersServices";
import validateToken from "../utils/user/validateToken";
import { getAllProfiles } from "../utils/profile/getAllProfiles";
import { TCustomAuthChecker } from "../types";
import { Request } from "express";

type TCustomContext = {
  req: Request
}

export const customAuthChecker: AuthChecker = async (
  { root, args, context, info }: TCustomAuthChecker, roles
): Promise<boolean> => {

  const token = context.token || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjdjYWNhYmY1LTE1NWYtNDY3Ny1hYmRhLWY2MDczOGUzN2ZiZSIsIm5hbWUiOiJNYXRoZXVzIiwiZW1haWwiOiJtYXRoZXVzQGdtYWlsLmNvbSIsInByb2ZpbGVzIjpbeyJpZCI6IjM1OTRkMmZkLTkxZjItNDMzNy05OGU4LTFjMzEzN2UyMTliMyIsInR5cGUiOiJhZG1pbiIsImxhYmVsIjoiQWRtaW4ifSx7ImlkIjoiNjcxNzc2NGQtZDcxOC00NTkwLTlhNDQtZTIzZTAzZWQ1Y2JiIiwidHlwZSI6ImNvbXVtIiwibGFiZWwiOiJDb211bSJ9XSwiaWF0IjoxNjIyNzgzMTM3LCJleHAiOjE2MjMwNDIzMzd9.KZObrmCj6bwqxIq5-1VIVwrHyySGoGIzP4P6l2jJS4M"
  if (!token) return false;
  
  const user = validateToken(token);

  let isAuthorized = await authAdmin(roles, user.id);
  if (isAuthorized) return true;

  const nameResolver = info.path.key;
  if (nameResolver === 'user') {
    isAuthorized = await authQueryUser(nameResolver, user.id, args);
  }

  return isAuthorized;
}

export function customContext({ req }: TCustomContext) {
  const auth = req.headers.authorization;
  const token = auth && auth.substring(7);

  const context = {
    token: token ? token : ''
  };

  return context;
}

async function authQueryUser(nameResolver: string | number, userId: string, { filter }: any) {
  const userService = new UsersServices();

  const userExists = await userService.findByEmail(filter.email);
  const isSameUser = userExists && userExists.id === userId;

  if (isSameUser) return true;

  return false
}

async function authAdmin(roles: string[], userID: string) {
  const profiles = await getAllProfiles(userID);
  const typeProfiles = profiles.map(profile => profile.type);

  let listBooleans: boolean[] = [];

  for (let role of roles) {
    const isAuthorized = typeProfiles.includes(role.toLowerCase());
    listBooleans.push(isAuthorized);
  }

  if (listBooleans.includes(true)) return true;
}