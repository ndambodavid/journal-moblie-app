import db from "../utils/db";

/**
 * retrieve category by name
 * @param name 
 * @returns 
 */
export function findCategoryByName(name: string) {
    return db.category.findFirst({
      where: {
        name,
      },
    });
  }

/**
 * add category
 * @param category 
 * @returns 
 */
export function createCategory(name: string) {
    return db.category.create({
        data: {
            name
        }
    });
}