import { title } from "process"
import db from "../utils/db"
import { createCategory, findCategoryByName } from "./category.service"


interface JournalData {
    id?: string
    title: string
    categoryName?: string
    content: string
    date?: Date
}

export async function createJournal(journal: JournalData) {
    console.log("creting journal", journal);

    // create category if it does not exist
        console.log("creting category......");
        
        const category = await createCategory(journal.categoryName!);
        console.log("created category", category);
        

        // create journal entry
        await db.journal.create({
            data: {
                title: journal.title,
                content: journal.content,
                categoryId: category.id,
                categoryName: category.name!,
                createdAt: journal.date!
            }
        });
    }

    export async function editJournal(journal: JournalData) {
            // create journal entry
            await db.journal.update({
                where: {
                    id: journal.id
                },
                data: {
                    title: journal.title,
                    content: journal.content
                }
            });
        }

export function findAllJournals() {
    return db.journal.findMany()
}
