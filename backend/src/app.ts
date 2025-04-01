import Fastify from "fastify";
import prisma from "./lib/prisma";
import swagger from "./lib/swagger";
import routes from "./routes";

export const buildApp = () => {
  const app = Fastify({ logger: true });

  app.register(swagger);
  app.register(prisma);
  app.register(routes);

  return app;
};
