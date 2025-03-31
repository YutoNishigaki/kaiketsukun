import Fastify from "fastify";
import routes from "./routes";

export const buildApp = () => {
  const app = Fastify({ logger: true });
  app.register(routes);
  return app;
};
