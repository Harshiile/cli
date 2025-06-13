import { Router, Request, Response } from 'express'
import { addUser, loginUser } from '../controllers/user';
import { changeVisibility, deleteWorkspace, getVisibility, getWorkspaces } from '../controllers/workspace';
import { middleware } from '../middleware';
import { getCode, pushCode } from '../controllers/code';
import { getUsername } from '../controllers/fetch';

export const router = Router();


router.get('/get-username', middleware, getUsername)
router.post('/add-user', addUser)
router.post('/login-user', loginUser)

router.get('/get-workspaces', middleware, getWorkspaces)
router.delete('/delete-workspace', middleware, deleteWorkspace)

router.get('/get-visibility', middleware, getVisibility)
router.patch('/change-visibility', middleware, changeVisibility)


router.post('/push-code', middleware, pushCode)
router.get('/get-code', middleware, getCode)


