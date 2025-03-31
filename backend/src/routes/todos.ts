import { FastifyPluginAsync } from "fastify";
import {
  createTodoController,
  getTodosController,
} from "../controllers/todo.controller";
import { createTodoSchema, getTodosSchema } from "../schemas/todo.schema";

const todoRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", { schema: getTodosSchema }, getTodosController);
  fastify.post("/", { schema: createTodoSchema }, createTodoController);
};

export default todoRoutes;
