import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { createCustomError } from "../errors/custom-error";
import mongoose from "mongoose";
import generateIdealPartnerProfile from "../services/openaiService";
import findMatchingUsers from "../services/matchingService";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    const { userKeywords, idealPartnerKeywords, partnerLocations } =
      await generateIdealPartnerProfile({ userPreferences: user.depiction });
    user.keywords = userKeywords;
    user.idealPartnerKeywords = idealPartnerKeywords;
    user.partnerLocations = partnerLocations;

    await user.save();

    res.status(201).json({ user });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const validationErrors: { [key: string]: string } = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });

      const customError = createCustomError("Validation Error", 400);
      customError.errors = validationErrors;
      return next(customError);
    } else {
      return next(createCustomError("Internal Server Error", 500));
    }
  }
};

const findMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.params;
    const isIdValid = mongoose.Types.ObjectId.isValid(userId);

    if (!isIdValid) {
      throw createCustomError(
        `Id - ${userId} is of an unsupported format`,
        400
      );
    }

    const match = await findMatchingUsers(userId);
    res.send({ match });
  } catch (error) {
    next(error);
  }
};

export { createUser, findMatch };
