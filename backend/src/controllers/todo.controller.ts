import { FastifyRequest, FastifyReply } from "fastify";
import { Todo } from "../types/todo";

let todos: Todo[] = []; // 仮データ（メモリ上）

export const getTodosController = async (
  _req: FastifyRequest,
  reply: FastifyReply
) => {
  return reply.send(todos);
};

export const createTodoController = async (
  req: FastifyRequest<{ Body: { title: string } }>,
  reply: FastifyReply
) => {
  const newTodo: Todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  return reply.code(201).send(newTodo);
};
