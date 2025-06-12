import { Router, Request, Response } from 'express'
import { addUser, loginUser } from '../controllers/user';
import { changeVisibility, deleteWorkspace, getVisibility, getWorkspaces } from '../controllers/workspace';
import { middleware } from '../middleware';

export const router = Router();


router.post('/add-user', addUser)
router.post('/login-user', loginUser)

router.get('/get-workspaces', middleware, getWorkspaces)
router.delete('/delete-workspace', middleware, deleteWorkspace)

router.get('/get-visibility', middleware, getVisibility)
router.patch('/change-visibility', middleware, changeVisibility)


