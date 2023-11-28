import { Response, Request, NextFunction } from "express";

export default function logger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { url, method } = req;
  const { statusCode } = res;
  const status = statusCode ?? "---";
  const date = new Date().toISOString();
  const template = `${date} | ${method} | ${url} | ${status} `;
  drawLine();
  console.log(template);
  drawLine();
  next();
}

function drawLine() {
  console.log(
    "--------------------------------------------------------------------",
  );
}

export { drawLine };
