import { Router, Request, Response } from 'express'
import { addUser, getUser } from '../controllers/user';
import { changeVisibility, deleteWorkspace, getVisibility, getWorkspaces } from '../controllers/workspace';

export const router = Router();


router.post('/add-user', addUser)
router.post('/get-user', getUser)

router.get('/get-workspaces', getWorkspaces)
router.delete('/delete-workspace', deleteWorkspace)

router.get('/get-visibility', getVisibility)
router.patch('/change-visibility', changeVisibility)


