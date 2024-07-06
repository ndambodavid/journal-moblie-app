import { title } from "process"
import db from "../utils/db"
import { createCategory, findCategoryByName } from "./category.service"


interface NewJournal {
    title: string
    categoryName: string
    content: string
    date: Date
}

export async function createJournal(journal: NewJournal) {

    // check if category exists
    let category = findCategoryByName(journal.categoryName);

    // create category if it does not exist
    if (!category) {
        category = await createCategory(journal.categoryName)
    }

    // create journal entry
    await db.journal.create({
        data: {
            title: journal.title,
            content: journal.content,
            categoryId: category.id,
            createdAt: journal.date
        }
    });
}

export function findAllJournals() {
    return db.journal.all()
}
