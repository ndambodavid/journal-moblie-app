import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from '@prisma/client';
import { uuid } from "uuidv4"
import { addRefreshTokenToWhitelist } from '../services/auth.service';
config();


/**
 * generate JWT access token
 * @param user 
 * @returns 
 */
export function generateAccessToken(user: User) {
    return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET || '', {
      expiresIn: '5m',
    });
  }
  
  /**
   * generate JWT refresh token
   * @param user 
   * @param jti 
   * @returns 
   */
  export function generateRefreshToken(user: User, jti: string) {
    return jwt.sign({
      userId: user.id,
      jti
    }, process.env.JWT_REFRESH_SECRET || '', {
      expiresIn: '8h',
    });
  }
  
  /**
   * generate both access and refresh tokens
   * @param user 
   * @param jti 
   * @returns 
   */
  export function generateTokens(user: User, jti: string) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);
  
    return {
      accessToken,
      refreshToken,
    };
  }


export const sendToken = async (user: User, statusCode: number, res: Response) => {
    const jti = uuid();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    // upload session to Cache
    // memecached client

    // memcache.set(JSON.stringify(user._id), JSON.stringify(user), {expires: 60}, (err, val) => {
    //     if (err) {
    //         return next(new Errorhandler(`${err}`, 400));
    //     }

    //     if (val) {
    //         console.log(val);
    //     }
    // });

    // redis client
    // const session = await redis.set(user._id, JSON.stringify(user), "EX", 300);
    // console.log(session);
    

    res.cookie("access_token", accessToken);
    res.cookie("refresh_token", refreshToken);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}