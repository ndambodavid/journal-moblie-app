import { User } from "@prisma/client";
import db from "../utils/db";
import bcrypt from "bcrypt";

export function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

interface RegisterBody  {
    email: string
    password: string
}

export function createUserByEmailAndPassword(user: RegisterBody) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

export function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}