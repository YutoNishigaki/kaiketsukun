/// <reference path="./index.d.ts" />
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN || "http://localhost:5173";

app.use(express.json());
app.use(cors({ origin: ORIGIN }));

// レスポンスの整形
app.use((_req: Request, res: Response, next: NextFunction) => {
  // 成功レスポンス
  res.success = function (data: any) {
    return res.json({ isSuccess: true, data, error: null });
  };

  // エラーレスポンス
  res.error = function (error: any, statusCode: number = 500) {
    return res.status(statusCode).json({ isSuccess: false, data: null, error });
  };

  next();
});

app.get("/api/sample", (_req: Request, res: Response) => {
  res.success({ message: "Hello, this is a sample message from the API!" });
});

app.get("/api/error", (_req: Request, res: Response) => {
  res.error("Something went wrong!", 400);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error: ", err);
  res.error(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
