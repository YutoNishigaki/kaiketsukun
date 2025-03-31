import { buildApp } from "./app";

const start = async () => {
  const app = buildApp();
  await app.listen({ port: 3000 });
};
start();
