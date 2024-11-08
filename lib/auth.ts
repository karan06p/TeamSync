import { ApiError } from "@/helpers/ApiError";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Error hashing Password", error);
    return ApiError("Error hashing Password", 400)
  }
}

export async function verifyPassword(
  inputPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

export function generateToken(userId: number) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_Secret is not defined in the enviroment variable ");
  }

  return jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
}
