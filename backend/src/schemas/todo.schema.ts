export const getTodosSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          title: { type: "string" },
          completed: { type: "boolean" },
        },
      },
    },
  },
};

export const createTodoSchema = {
  body: {
    type: "object",
    required: ["title"],
    properties: {
      title: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "number" },
        title: { type: "string" },
        completed: { type: "boolean" },
      },
    },
  },
};
