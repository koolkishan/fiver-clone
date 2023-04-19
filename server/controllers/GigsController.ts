// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { renameSync } from "fs";

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
        renameSync(
          req.files[file].path,
          "uploads/" + req.files[file].originalname
        );
        fileNames.push(req.files[file].originalname);
      });
    }
    if (req.query) {
      const {
        title,
        description,
        category,
        features,
        price,
        revisions,
        time,
      }: {
        title: string;
        description: string;
        category: string;
        features: string[];
        price: number;
        revisions: number;
        time: number;
      } = req.query;
      const prisma = new PrismaClient();
      const gig = await prisma.gigs.create({
        data: {
          title,
          description,
          deliveryTime: parseInt(time),
          category,
          features,
          price: parseInt(price),
          revisions: parseInt(revisions),
          createdBy: { connect: { id: req.userId } },
        },
      });
      console.log({ gig });

      return res.status(201).send("Successfully created the gig.");
    }
    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log({ err });
    return res.status(500).send("Internal Server Error");
  }
};
