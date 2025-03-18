import { clerkClient, getAuth } from "@clerk/express";

export const requireAuth = async (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const user = await clerkClient.users.getUser(userId);

    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
};
