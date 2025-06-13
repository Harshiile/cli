import { Router, Request, Response } from 'express'
import { addUser, loginUser, testAPI } from '../controllers/user';
import { changeVisibility, deleteWorkspace, getVisibility, getWorkspaces } from '../controllers/workspace';
import { middleware } from '../middleware';
import { getCode, pushCode } from '../controllers/code';

export const router = Router();


router.get('/test', testAPI)
router.post('/add-user', addUser)
router.post('/login-user', loginUser)

router.get('/get-workspaces', middleware, getWorkspaces)
router.delete('/delete-workspace', middleware, deleteWorkspace)

router.get('/get-visibility', middleware, getVisibility)
router.patch('/change-visibility', middleware, changeVisibility)

router.post('/push-code', middleware, pushCode)
router.get('/get-code', middleware, getCode)


