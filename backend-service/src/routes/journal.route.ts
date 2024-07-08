import express from "express";
import { addJournal, getAllJournals, updateJournal } from "../controllers/journal.controller";
import { isAuthenticated } from "../middleware/auth";


// journal router
const journalRouter = express.Router();

journalRouter.post('/', isAuthenticated, addJournal);

journalRouter.get('/', isAuthenticated, getAllJournals);

journalRouter.put('/', isAuthenticated, updateJournal)

export default journalRouter;