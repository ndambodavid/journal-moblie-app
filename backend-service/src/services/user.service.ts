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

export function findAllUser() {
  return db.user.findMany()
}


interface UpdateBody  {
  id: string
  email?: string
  password?: string | Buffer
}
export function updateUserEmailAndPassword(user: UpdateBody) {
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, 12);

    return db.user.update({
      where : {
        id: user.id
      },
      data: {
        email: user.email,
        password: user.password
      }
    });
  }
  
  return db.user.update({
    where : {
      id: user.id
    },
    data: {
      email: user.email,
    }
  });
}