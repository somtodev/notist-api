import { Response, Request, NextFunction } from "express";

export default function logger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { url, method } = req;
  const date = new Date().toISOString();
  const template = `${date} | ${method} | ${url} | `;
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
