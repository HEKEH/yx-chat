import { decode, encode } from 'jwt-simple';
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
