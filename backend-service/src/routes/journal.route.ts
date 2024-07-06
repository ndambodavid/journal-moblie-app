import express from "express";
import { addJournal, getAllJournals } from "../controllers/journal.controller";


// journal router
const journalRouter = express.Router();

journalRouter.post('/journal', addJournal);

journalRouter.get('/journal', getAllJournals);

export default journalRouter;