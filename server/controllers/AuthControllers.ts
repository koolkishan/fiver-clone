import { NextFunction, Response, Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

const generatePassword = async (password: string) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (email: string) => {
  // @ts-ignore
  return sign({ email }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    if (email && password) {
      await prisma.user.create({
        data: {
          email,
          password: await generatePassword(password),
        },
      });
      res
        .cookie("jwt", createToken(email), {
          httpOnly: false,
          maxAge: maxAge * 1000,
        })
        .status(201)
        .send();
    } else {
      res.status(400).send("Email and Password Required");
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
        res.status(400).send("Email Already Registered");
      }
    } else {
      res.status(500).send("Internal Server Error");
    }
    throw err;
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("here", req.body);
    if (req.body.email && req.body.password) {
    } else {
    }
  } catch (err) {}
};

export const socialLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {}
};
