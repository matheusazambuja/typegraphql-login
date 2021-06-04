import { decode } from "jwt-simple";


function validateToken(token: string | undefined) { 
  if (token) {
    const authSecret = process.env.APP_AUTH_SECRET;

    if (authSecret) {
      let tokenContentUser = decode(token, authSecret);

      const expirationMilliseconds = new Date(tokenContentUser.exp * 1000);
      const dateNow = new Date();

      if (expirationMilliseconds < dateNow) throw new Error('Sessão expirada. Faça login novamente.');

      return tokenContentUser;
    }
  }

  return null;
}

export default validateToken;