// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const stripe = require("stripe")(
  "sk_test_51DpVXWGc9EcLzRLBNKni929hB026lACv6toMfjH1FPtIXfYgIrhXzjolcYzDDl2VwtvmyPF20PJ1JaMUCTNoEwDN00FN8hrRZL"
);

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    if (req.body.gigId) {
      const { gigId } = req.body;
      const prisma = new PrismaClient();
      const gig = await prisma.gigs.findUnique({
        where: { id: parseInt(gigId) },
      });
      console.log({ gig });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: gig?.price! * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      await prisma.orders.create({
        data: {
          paymentIntent: paymentIntent.id,
          price: gig?.price!,
          buyer: { connect: { id: req?.userId } },
          gig: { connect: { id: gig?.id } },
        },
      });
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(400).send("Gig id is required.");
    }
  } catch (err) {
    console.log(err);
  }
};

export const confirmOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.paymentIntent) {
      const prisma = new PrismaClient();
      await prisma.orders.update({
        where: { paymentIntent: req.body.paymentIntent },
        data: { isCompleted: true },
      });
    }
  } catch (err) {
    console.log(err);
  }
};
