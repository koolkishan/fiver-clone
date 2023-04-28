import { PrismaClient } from "@prisma/client";

export const addMessage = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();

    if (
      req.userId &&
      req.body.recipentId &&
      req.params.orderId &&
      req.body.message
    ) {
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

export const getMessages = async (req, res, next) => {
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
      return res.status(200).json({ messages, recipentId });
    }
    return res.status(400).send("Order id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUnreadMessages = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const messages = await prisma.message.findMany({
        where: {
          recipientId: req.userId,
          isRead: false,
        },
        include: {
          sender: true,
        },
      });
      return res.status(200).json({ messages });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    if (req.userId && req.params.messageId) {
      const prisma = new PrismaClient();
      await prisma.message.update({
        where: { id: parseInt(req.params.messageId) },
        data: { isRead: true },
      });
      return res.status(200).send("Message mark as read.");
    }
    return res.status(400).send("User id and message Id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
