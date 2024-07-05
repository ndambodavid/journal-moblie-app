import { Request, Response, NextFunction, request } from "express";
import Errorhandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { createUserByEmailAndPassword, findUserByEmail } from "../services/user.service";
import bycryt from "bcrypt";

// register user
interface RegisterBody {
    name?: string;
    email: string;
    password: string;
    avatar?: string;
}


export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // extract credentials from request body
        const { email, password } = req.body;

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


//login user
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

// logout user

// export const logoutUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         res.cookie("access_token", "", { maxAge: 1 });
//         res.cookie("refresh_token", "", { maxAge: 1 });
//         const userId = req.user?._id || '';

        //delete user instance from cache
        // memcache.get(JSON.stringify(userId), (err, val) => {
        //     if (err) {
        //         return next(new Errorhandler(`${err}`, 400));
        //     }

        //     if (val) {
        //         console.log(val);
        //     }
        // })

        // const sessionEnd = await redis.del(userId);

        // close redis connection
        // redis.quit();

        // res.status(200).json({
//             success: true,
//             message: "Logged out successfully"
//         });
//     } catch (error: any) {
//         return next(new Errorhandler(error.message, 400));
//     }
// })

// update access token
// export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const refresh_token = req.cookies.refresh_token as string;
//         const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;

//         const message = 'Could not refresh token';

//         if (!decoded) {
//             return next(new Errorhandler(message, 400));
//         }


//         // memcache.get(decoded.id as string, (err, val) => {
//         //     if (err) {
//         //         console.log(err);
//         //         // return next(new Errorhandler(message, 400));
//         //     }

//         //     if (val) {
//         //         // user = JSON.parse(val.toString());

//         //         const user = JSON.parse(val.toString())
//         //         console.log(user)

//         //     }

//         //     if (val === null) {
//         //         console.log("no user retrieved from cache");

//         //     }
//         // });

//         const session = await redis.get(decoded.id);

//         if (!session) {
//             return next(new Errorhandler("Please login to access this resource!", 400));
//         }

//         const user = JSON.parse(session);

//         const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, {
//             expiresIn: "5m"
//         });

//         const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, {
//             expiresIn: "3d"
//         })

//         req.user = user;

//         res.cookie("access_token", accessToken, accessTokenOptions);
//         res.cookie("refresh_token", refreshToken, refreshTokenOptions);

//         await redis.set(user._id, JSON.stringify(user), "EX", 432000); // 5 days

//         res.status(200).json({
//             status: "success",
//             accessToken,
//         })

//     } catch (error: any) {
//         return next(new Errorhandler(error.message, 400));
//     }
// });

// //get user info
// export const getUserInfo = CatchAsyncError(
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const userId = req.user?._id;
//             getUserById(userId, res);
//         } catch (error: any) {
//             return next(new Errorhandler(error.message, 400));
//         }
//     }
// );

// interface SocialAuthBody {
//     email: string;
//     name: string;
//     avatar: string;
// }
// // social auth
// export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email, name, avatar } = req.body as SocialAuthBody;
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             const newUser = await userModel.create({ email, name, avatar });
//             sendToken(newUser, 200, res);
//         } else {
//             sendToken(user, 200, res);
//         }
//     } catch (error: any) {
//         return next(new Errorhandler(error.message, 400));
//     }
// });

// // update user info
// interface UpdateUserInfo {
//     name?: string;
//     email?: string;
// }

// export const updateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { name, email } = req.body as UpdateUserInfo;
//         const userId = req.user?._id;
//         const user = await userModel.findById(userId);

//         if (email && user) {
//             const isEmailExist = await userModel.findOne({ email });
//             if (isEmailExist) {
//                 return next(new Errorhandler("email already exist", 400));
//             }
//             user.email = email;
//         }

//         if (name && user) {
//             user.name = name;
//         }

//         await user?.save();

//         await redis.set(userId, JSON.stringify(user));

//         res.status(201).json({
//             success: true,
//             user,
//         })

//     } catch (error: any) {
//         return next(new Errorhandler(error.message, 400));
//     }
// });

// // update user password
// interface UpdatePassword {
//     oldPassword: string;
//     newPassword: string;
// }

// export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { oldPassword, newPassword } = req.body as UpdatePassword;

//         if (!oldPassword || !newPassword) {
//             return next(new Errorhandler("Please enter old and new password", 400));
//         }

//         const user = await userModel.findById(req.user?._id).select("+password");

//         if (user?.password === undefined) {
//             return next(new Errorhandler("Invalid user", 400))
//         }

//         const isPasswordMatch = await user?.comparePassword(oldPassword);

//         if (!isPasswordMatch) {
//             return next(new Errorhandler("Invalid old password", 400));
//         }

//         user.password = newPassword;

//         await user.save();

//         await redis.set(req.user?._id, JSON.stringify(user));

//         res.status(201).json({
//             success: true,
//             user,
//         });

//     } catch (error: any) {
//         return next(new Errorhandler(error.message, 400))
//     }
// });

// interface UpdateAvatar {
//     avatar: string;
// }
// // update/upload profile avatar
// export const updateAvatar = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { avatar } = req.body;

//         const userId = req.user?._id;

//         const user = await userModel.findById(userId);

//         if (avatar && user) {
//             if (user?.avatar?.public_id) {
//                 await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

//                 const myCloud = await cloudinary.v2.uploader.upload(avatar, {
//                     folder: "avatars",
//                     width: 150
//                 });
//                 user.avatar = {
//                     public_id: myCloud.public_id,
//                     url: myCloud.secure_url
//                 }
//             } else {
//                 const myCloud = await cloudinary.v2.uploader.upload(avatar, {
//                     folder: "avatars",
//                     width: 150
//                 });
//                 user.avatar = {
//                     public_id: myCloud.public_id,
//                     url: myCloud.secure_url
//                 }
//             }
//         }
//         await user?.save();

//         await redis.set(userId, JSON.stringify(user));

//         res.status(200).json({
//             success: true,
//             user,
//         })
//     } catch (error: any) {
//         return next(new Errorhandler(error.message, 400));
//     }
// });

// // get all users -- only admin
// export const getAllUsers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         getAllUsersService(req, res, next);
//     } catch (error: any) {
//         return next(new Errorhandler(error.message, 400));
//     }
// });

// // update user role --only admin
// export const updateUserRole = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id, role } = req.body;
//         updateUserRoleService(res, id, role);
//     } catch (error: any) {
//         return next(new Errorhandler(error.message, 400));
//     }
// });

// // Delete user --- only admin
// export const deleteUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;

//         const user = await UserModel.findById(id);

//         if (!user) {
//             return next(new Errorhandler("User not found", 404));
//         }

//         await user.deleteOne({ id });

//         await redis.del(id)

//         res.status(200).json({
//             success: true,
//             message: "User deleted successfully"
//         });

//     } catch (error: any) {
//         return next(new Errorhandler(error.message, 400));
//     }
// });