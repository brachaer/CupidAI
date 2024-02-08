import { Types } from "mongoose";
import User from "../models/User";
import { CustomAPIError, createCustomError } from "../errors/custom-error";

const calculateCompatibility = (
  userA: { idealPartnerKeywords?: string[] },
  userB: { keywords: string[] }
): number => {
  const keywordsA = new Set(userA.idealPartnerKeywords || []);
  const keywordsB = new Set(userB.keywords || []);

  const sharedKeywordsCount = [...keywordsA].filter((keyword) =>
    keywordsB.has(keyword)
  ).length;

  const compatibility = (sharedKeywordsCount / keywordsA.size) * 100;

  return compatibility;
};

const findMatchingUsers = async (currentUserId: string) => {
  try {
    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      throw createCustomError("User not found", 404);
    }

    const currentUserIdealPartnerKeywords =
      currentUser.idealPartnerKeywords || [];

    const matchingUsers = await User.find({
      _id: { $ne: new Types.ObjectId(currentUserId) },
      keywords: { $in: currentUserIdealPartnerKeywords },
    });

    let bestMatch = null;
    let highestCompatibility = 0;

    matchingUsers.forEach((user) => {
      const compatibility = calculateCompatibility(currentUser, user);

      if (compatibility >= 50 && compatibility > highestCompatibility) {
        bestMatch = user;
        highestCompatibility = compatibility;
      }
    });

    if (!bestMatch) {
      return null;
    }

    return bestMatch;
  } catch (error: any) {
    console.error("Error Finding Matching User:", error.message);
    throw error instanceof CustomAPIError
      ? error
      : createCustomError("Internal Server Error", 500);
  }
};

export default findMatchingUsers;
