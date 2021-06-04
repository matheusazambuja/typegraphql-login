import 'reflect-metadata';
import * as _ from 'lodash';

import './database';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user/UserResolver';
import { ProfileResolver } from './resolvers/profile/ProfileResolver';
import { customAuthChecker, customContext } from './auth/auth';


async function bootstrap() {
  const app = express();
  const path = '/graphql';
  const port = 4100;

  const schema = await buildSchema({
    resolvers: [UserResolver, ProfileResolver],
    authChecker: customAuthChecker
  });

  const server = new ApolloServer({
    schema,
    context: customContext
  });

  server.applyMiddleware({ app, path });

  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${path}`);
  });
}

bootstrap();