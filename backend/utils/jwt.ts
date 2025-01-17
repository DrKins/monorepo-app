import { createSecretKey } from "crypto";
import { NextFunction, Request, Response } from "express";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

interface TokenPayloadInterface extends JWTPayload {
  id: number;
  email: string;
}

const secretKey = createSecretKey(
  process.env.JWT_SECRET ?? "default-secret",
  "utf-8",
);

export const signJwt = async (payload: TokenPayloadInterface) =>
  await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME!)
    .sign(secretKey);

interface CustomRequest extends Request {
  user?: Record<string, any>;
}

export const verifyJwt = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const { payload } = await jwtVerify(token, secretKey);

    req.user = payload;

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
