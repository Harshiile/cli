import { Router, Request, Response } from 'express'
import { addUser, loginUser } from '../controllers/user';
import { changeVisibility, deleteWorkspace, getVisibility, getWorkspaces } from '../controllers/workspace';
import { middleware } from '../middleware';
import { getCode, pushCode } from '../controllers/code';
import multer from 'multer'
import { getUsername } from '../controllers/fetch';

export const router = Router();


router.get('/get-username', middleware, getUsername)
router.post('/add-user', addUser)
router.post('/login-user', loginUser)

router.get('/get-workspaces', middleware, getWorkspaces)
router.delete('/delete-workspace', middleware, deleteWorkspace)

router.get('/get-visibility', middleware, getVisibility)
router.patch('/change-visibility', middleware, changeVisibility)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const [_, username, workspaceName] = file.originalname.split('-')
        cb(null, `${username}-${workspaceName}`)
    }
})
const upload = multer({ storage })
const uploadMiddleware = upload.fields([{ name: 'zipFile', maxCount: 1 }])
router.post('/push-code', middleware, uploadMiddleware, pushCode)

router.get('/get-code', middleware, uploadMiddleware, getCode)


