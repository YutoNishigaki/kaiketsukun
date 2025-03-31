import Fastify from "fastify";
import prisma from "./lib/prisma";
import routes from "./routes";

export const buildApp = () => {
  const app = Fastify({ logger: true });
  app.register(prisma);
  app.register(routes);
  return app;
};
