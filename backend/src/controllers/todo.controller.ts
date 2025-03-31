import { FastifyRequest, FastifyReply } from "fastify";

export const getTodosController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const todos = await req.server.prisma.todo.findMany();
  return reply.send(todos);
};

export const createTodoController = async (
  req: FastifyRequest<{ Body: { title: string } }>,
  reply: FastifyReply
) => {
  const newTodo = await req.server.prisma.todo.create({
    data: {
      title: req.body.title,
    },
  });
  return reply.code(201).send(newTodo);
};
