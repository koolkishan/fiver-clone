// @ts-nocheck
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  //   console.log(req.header("authorization"));
  console.log({ token });
  if (!token) return res.status(401).send("You are not authenticated!");

  jwt.verify(token, process.env.JWT_KEY!, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload?.userId;
    next();
  });
};
