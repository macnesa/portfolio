import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateJWT(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1D" });
}

export function verifyJWT(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: number };
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function buildSig(params: Record<string, string>, secret: string): string {
  const orderedKeys = Object.keys(params).sort();
  const baseString = orderedKeys.map(key => `${key}${params[key]}`).join('') + secret;
  return crypto.createHash('md5').update(baseString, 'utf8').digest('hex');
}