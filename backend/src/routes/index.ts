import { FastifyPluginAsync } from "fastify";
import todoRoutes from "./todos";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(todoRoutes, { prefix: "/todos" });
};

export default routes;
