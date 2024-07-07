import express from "express";
import { addJournal, getAllJournals, updateJournal } from "../controllers/journal.controller";


// journal router
const journalRouter = express.Router();

journalRouter.post('/', addJournal);

journalRouter.get('/', getAllJournals);

journalRouter.put('/', updateJournal)

export default journalRouter;