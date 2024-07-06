import { title } from "process"
import db from "../utils/db"
import { createCategory, findCategoryByName } from "./category.service"


interface JournalData {
    title: string
    categoryName: string
    content: string
    date: Date
}

export async function createJournal(journal: JournalData) {

    // check if category exists
    const category = findCategoryByName(journal.categoryName);

    // create category if it does not exist
    if (!category) {
        const categoryEntry = await createCategory(journal.categoryName);

        // create journal entry
        await db.journal.create({
            data: {
                title: journal.title,
                content: journal.content,
                categoryId: categoryEntry.id,
                createdAt: journal.date
            }
        });
    }
}

export function findAllJournals() {
    return db.journal.findMany()
}
