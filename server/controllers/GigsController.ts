// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { existsSync, renameSync, unlinkSync } from "fs";

export const addGig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.files) {
      const fileKeys = Object.keys(req.files);
      const fileNames = [];
      fileKeys.forEach((file: any) => {
        const date = Date.now();
        renameSync(
          req.files[file].path,
          "uploads/" + date + req.files[file].originalname
        );
        fileNames.push(date + req.files[file].originalname);
      });
      if (req.query) {
        const {
          title,
          description,
          category,
          features,
          price,
          revisions,
          time,
          shortDesc,
        }: {
          title: string;
          description: string;
          category: string;
          features: string[];
          price: number;
          revisions: number;
          time: number;
          shortDesc: string;
        } = req.query;
        const prisma = new PrismaClient();

        await prisma.gigs.create({
          data: {
            title,
            description,
            deliveryTime: parseInt(time),
            category,
            features,
            price: parseInt(price),
            shortDesc,
            revisions: parseInt(revisions),
            createdBy: { connect: { id: req.userId } },
            images: fileNames,
          },
        });

        return res.status(201).send("Successfully created the gig.");
      }
    }
    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserAuthGigs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: { gigs: true },
      });
      return res.status(200).json({ gigs: user?.gigs ?? [] });
    }
    return res.status(400).send("UserId should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getGigData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.gigId) {
      const prisma = new PrismaClient();
      const gig = await prisma.gigs.findUnique({
        where: { id: parseInt(req.params.gigId) },
        include: {
          reviews: {
            include: {
              reviewer: true,
            },
          },
          createdBy: true,
        },
      });

      const userWithGigs = await prisma.user.findUnique({
        where: { id: gig?.createdBy.id },
        include: {
          gigs: {
            include: { reviews: true },
          },
        },
      });

      const totalReviews = userWithGigs.gigs.reduce(
        (acc, gig) => acc + gig.reviews.length,
        0
      );

      const averageRating = (
        userWithGigs.gigs.reduce(
          (acc, gig) =>
            acc + gig.reviews.reduce((sum, review) => sum + review.rating, 0),
          0
        ) / totalReviews
      ).toFixed(1);

      return res
        .status(200)
        .json({ gig: { ...gig, totalReviews, averageRating } });
    }
    return res.status(400).send("GigId should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const editGig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.files) {
      const fileKeys = Object.keys(req.files);
      const fileNames = [];
      fileKeys.forEach((file: any) => {
        const date = Date.now();
        renameSync(
          req.files[file].path,
          "uploads/" + date + req.files[file].originalname
        );
        fileNames.push(date + req.files[file].originalname);
      });
      if (req.query) {
        const {
          title,
          description,
          category,
          features,
          price,
          revisions,
          time,
          shortDesc,
        }: {
          title: string;
          description: string;
          category: string;
          features: string[];
          price: number;
          revisions: number;
          time: number;
          shortDesc: string;
        } = req.query;
        const prisma = new PrismaClient();
        const oldData = await prisma.gigs.findUnique({
          where: { id: parseInt(req.params.gigId) },
        });
        await prisma.gigs.update({
          where: { id: parseInt(req.params.gigId) },
          data: {
            title,
            description,
            deliveryTime: parseInt(time),
            category,
            features,
            price: parseInt(price),
            shortDesc,
            revisions: parseInt(revisions),
            createdBy: { connect: { id: parseInt(req.userId) } },
            images: fileNames,
          },
        });
        oldData?.images.forEach((image) => {
          if (existsSync(`uploads/${image}`)) unlinkSync(`uploads/${image}`);
        });

        return res.status(201).send("Successfully Eited the gig.");
      }
    }
    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const searchGigs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.searchTerm || req.query.category) {
      const prisma = new PrismaClient();
      const gigs = await prisma.gigs.findMany(
        createSearchQuery(req.query.searchTerm, req.query.category)
      );
      return res.status(200).json({ gigs });
    }
    return res.status(400).send("Search Term or Category is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const createSearchQuery = (searchTerm, category) => {
  const query = {
    where: {
      OR: [],
    },
    include: {
      reviews: {
        include: {
          reviewer: true,
        },
      },
      createdBy: true,
    },
  };
  if (searchTerm) {
    query.where.OR.push({
      title: { contains: searchTerm },
    });
  }
  if (category) {
    query.where.OR.push({
      category: { contains: category },
    });
  }
  return query;
};

const checkOrder = async (userId, gigId) => {
  try {
    const prisma = new PrismaClient();
    const hasUserOrderedGig = await prisma.orders.findFirst({
      where: {
        buyerId: parseInt(userId),
        gigId: parseInt(gigId),
        isCompleted: true,
      },
    });
    return hasUserOrderedGig;
  } catch (err) {
    console.log(err);
  }
};

export const checkGigOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userId && req.params.gigId) {
      const hasUserOrderedGig = await checkOrder(req.userId, req.params.gigId);
      return res
        .status(200)
        .json({ hasUserOrderedGig: hasUserOrderedGig ? true : false });
    }
    return res.status(400).send("userId and gigId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userId && req.params.gigId) {
      if (await checkOrder(req.userId, req.params.gigId)) {
        if (req.body.reviewText && req.body.rating) {
          const prisma = new PrismaClient();
          const newReview = await prisma.reviews.create({
            data: {
              rating: req.body.rating,
              reviewText: req.body.reviewText,
              reviewer: { connect: { id: parseInt(req?.userId) } },
              gig: { connect: { id: parseInt(req.params.gigId) } },
            },
            include: {
              reviewer: true,
            },
          });
          console.log({ newReview });

          return res.status(201).json({ newReview });
        }
        return res.status(400).send("ReviewText and Rating are required.");
      }
      return res
        .status(400)
        .send("You need to purchase the gig in order to add review.");
    }
    return res.status(400).send("userId and gigId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
