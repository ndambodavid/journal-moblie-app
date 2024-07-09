import { Request, Response, NextFunction, request } from "express";
import Errorhandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { sendToken } from "../utils/jwt";
import { createUserByEmailAndPassword, findAllUser, findUserByEmail, updateUserEmailAndPassword } from "../services/user.service";
import bycryt from "bcrypt";

// register user
interface RegisterBody {
    id?: string
    name?: string;
    email: string;
    password: string;
    avatar?: string;
}


export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // extract credentials from request body
        const { email, password } = req.body as RegisterBody;

        // validate that user credentials are not null
        if (!email || !password) {
            return next(new Errorhandler("You must provide an email and a password.", 400));
        }

        // check if email already exists
        const isEmailExist = await findUserByEmail(email);
        if (isEmailExist) {
            return next(new Errorhandler("Email already exist", 400));
        };

        // create user
        await createUserByEmailAndPassword({ email, password });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
        });

    } catch (error: any) {
        return next(new Errorhandler(error.message, 400));
    }
});


interface LoginRequest {
    email: string;
    password: string;
}

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // extract credential s from request body
        const { email, password } = req.body as LoginRequest;

        // validate that user credentials are not null
        if (!email || !password) {
            return next(new Errorhandler("please enter email and password", 400));
        }

        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
            return next(new Errorhandler("invalid email or password", 400))
        }

        const isPasswordMatch = await bycryt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return next(new Errorhandler("invalid email or password", 400))
        }

        sendToken(existingUser, 200, res);
    } catch (error: any) {
        return next(new Errorhandler(error.message, 400))
    }
});

export const getAllUsers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let users = await findAllUser();
        res.status(200).json({
            success: true,
            users: users
        })
    } catch (error: any) {
        return next(new Errorhandler(error.message, 400))
    }
});

export const updateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // extract credentials from request body
        const { id, email, password } = req.body as RegisterBody;

        // validate that user credentials are not null
        if (!email && !password) {
            return next(new Errorhandler("You must provide an email or a password.", 400));
        }

        if (!id) {
            return next(new Errorhandler("You must provide user id", 400));
        }
        // update user
        const user = await updateUserEmailAndPassword({ id, email, password });

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: user
        });

    } catch (error: any) {
        return next(new Errorhandler(error.message, 400));
    }
});

