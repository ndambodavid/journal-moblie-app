import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import Errorhandler from "../utils/ErrorHandler";
import { createJournal, findAllJournals } from "../services/journal.service";


export const addJournal = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // extract journal data from request body
        const {title, content, categoryName, date} = req.body;

        // validate journal data
        if (!title || !content || !categoryName || !date) {
            return next(new Errorhandler(" One or more fields missing.", 400))
        }

        // create journal
        await createJournal({title, content, categoryName, date});

        res.status(201).json({
            succes: true,
            message: 'Journal created successfully'
        })
    } catch (error: any) {
        return next(new Errorhandler(error.message, 400));
    }
});

export const getAllJournals = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get journals
        let journals = await findAllJournals();

        res.status(200).json({
            success: true,
            message: 'all journals',
            data: journals
        })
    } catch (error: any) {
        return next(new Errorhandler(error.message, 400));
    }
});