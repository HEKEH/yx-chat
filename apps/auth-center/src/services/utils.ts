import { decode, encode } from 'jwt-simple';
import { Types } from 'mongoose';
import config from '../config';

export function generateToken(userId: string, environment: string) {
  return encode(
    {
      userId,
      environment,
      expires: Date.now() + config.jwtTokenExpiresTime,
    },
    config.jwtSecret,
    config.jwtAlgorithm,
  );
}

export function parseToken(token: string): {
  userId: string;
  environment: string;
  expires: number;
} {
  return decode(token, config.jwtSecret, false, config.jwtAlgorithm);
}

/**
 * @returns is valid mongodb id
 */
export function isIdValid(id: string) {
  return Types.ObjectId.isValid(id);
}
