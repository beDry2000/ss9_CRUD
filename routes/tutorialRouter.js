import { Router } from "express";
import { getAll, getById, getByTitle, createTutorial, updateTutorial, deleteTutorial } from '../controllers/tutorialController';
import authen from "../middleware/authMiddleware";

const tutorialRouter = Router();

tutorialRouter.use(authen);

tutorialRouter.get('/', getAll);
tutorialRouter.get('/findByTitle', getByTitle);
tutorialRouter.get('/:id', getById);
tutorialRouter.post('/', createTutorial);
tutorialRouter.put('/:id', updateTutorial);
tutorialRouter.delete('/:id', deleteTutorial);

export default tutorialRouter;