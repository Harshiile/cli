import { Router, Request, Response } from 'express'
import { addUser, loginUser } from '../controllers/user';
import { changeVisibility, deleteWorkspace, getVisibility, getWorkspaces } from '../controllers/workspace';
import { middleware } from '../middleware';
import { getCode } from '../controllers/code';
import multer from 'multer'

export const router = Router();


router.post('/add-user', addUser)
router.post('/login-user', loginUser)

router.get('/get-workspaces', middleware, getWorkspaces)
router.delete('/delete-workspace', middleware, deleteWorkspace)

router.get('/get-visibility', middleware, getVisibility)
router.patch('/change-visibility', middleware, changeVisibility)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        console.log(req.body.name);

        // console.log(`${req.username}/`);

        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage })
const uploadMiddleware = upload.fields([{ name: 'zipFile', maxCount: 1 }])
router.post('/push-code', middleware, uploadMiddleware, getCode)


