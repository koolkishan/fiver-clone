// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const getSellerData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const gigs = await prisma.gigs.count({ where: { userId: req.userId } });
      const {
        _count: { id: orders },
      } = await prisma.orders.aggregate({
        where: {
          isCompleted: true,
          gig: {
            createdBy: {
              id: req.userId,
            },
          },
        },
        _count: {
          id: true,
        },
      });
      const unreadMessages = await prisma.message.count({
        where: {
          recipientId: req.userId,
          isRead: false,
        },
      });

      const today = new Date();
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const thisYear = new Date(today.getFullYear(), 0, 1);

      const {
        _sum: { price: revenue },
      } = await prisma.orders.aggregate({
        where: {
          gig: {
            createdBy: {
              id: req.userId,
            },
          },
          isCompleted: true,
          createdAt: {
            gte: thisYear,
          },
        },
        _sum: {
          price: true,
        },
      });

      const {
        _sum: { price: dailyRevenue },
      } = await prisma.orders.aggregate({
        where: {
          gig: {
            createdBy: {
              id: req.userId,
            },
          },
          isCompleted: true,
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
        _sum: {
          price: true,
        },
      });

      const {
        _sum: { price: monthlyRevenue },
      } = await prisma.orders.aggregate({
        where: {
          gig: {
            createdBy: {
              id: req.userId,
            },
          },
          isCompleted: true,
          createdAt: {
            gte: thisMonth,
          },
        },
        _sum: {
          price: true,
        },
      });

      console.log("Total revenue:", revenue);
      console.log("Daily revenue:", dailyRevenue);
      console.log("Monthly revenue:", monthlyRevenue);

      console.log({ unreadMessages });
      console.log({ orders });
      console.log({ gigs });
      return res.status(200).json({
        dashboardData: {
          orders,
          gigs,
          unreadMessages,
          dailyRevenue,
          monthlyRevenue,
          revenue,
        },
      });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
