import crypto from 'crypto'

/**
 * hash the jwt token before saving to database
 * @param token 
 * @returns 
 */
export default function hashToken(token: string) {
    return crypto.createHash('sha512').update(token).digest('hex');
  }