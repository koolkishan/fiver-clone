// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prisma = new PrismaClient();

    if (
      req.userId &&
      req.body.recipentId &&
      req.params.orderId &&
      req.body.message
    ) {
      console.log({ userId: req.userId, recipent: req.body.recipentId });
      const message = await prisma.message.create({
        data: {
          sender: {
            connect: {
              // @ts-expect-error
              id: parseInt(req.userId),
            },
          },
          recipient: {
            connect: {
              id: parseInt(req.body.recipentId),
            },
          },
          order: {
            connect: {
              id: parseInt(req.params.orderId),
            },
          },
          text: req.body.message,
        },
      });
      console.log({ message });
      return res.status(201).json({ message });
    }
    return res
      .status(400)
      .send("userId, recipentId, orderId and message is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.orderId && req.userId) {
      const prisma = new PrismaClient();
      const messages = await prisma.message.findMany({
        where: {
          order: {
            id: parseInt(req.params.orderId),
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      await prisma.message.updateMany({
        where: {
          orderId: parseInt(req.params.orderId),
          recipientId: parseInt(req.userId),
        },
        data: {
          isRead: true,
        },
      });
      const order = await prisma.orders.findUnique({
        where: { id: parseInt(req.params.orderId) },
        include: { gig: true },
      });
      let recipentId;
      if (order?.buyerId === req.userId) {
        recipentId = order.gig.userId;
      } else if (order?.gig.userId === req.userId) {
        recipentId = order.buyerId;
      }
      console.log({ order });
      return res.status(200).json({ messages, recipentId });
    }
    return res.status(400).send("Order id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
