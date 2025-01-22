import jwt from "jsonwebtoken";

export function generateToken(
  data: Record<string, unknown>,
  secret = process.env.JWT_SECRET
) {
  if (!secret) {
    throw new Error("JWT secret is not defined.");
  }

  return jwt.sign(data, secret);
}

export function decodeToken(token: string, secret = process.env.JWT_SECRET) {
  if (!secret) {
    throw new Error("JWT secret is not defined.");
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
}

export const getDataFromReq = (req: Request): any => {
  const authorization = req.headers.get("authorization");
  const token = authorization?.split("Bearer ")[1];

  const data = decodeToken(token!);

  return data;
};
