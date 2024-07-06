import db from "../utils/db";
import bcrypt from "bcrypt";

/**
 * retrieve user by email
 * @param email 
 * @returns 
 */
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

/**
 * add user
 * @param user 
 * @returns 
 */
export function createUserByEmailAndPassword(user: RegisterBody) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

/**
 * retrieve user by id
 * @param id 
 * @returns 
 */
export function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}