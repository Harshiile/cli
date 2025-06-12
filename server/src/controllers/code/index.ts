import { Request, Response } from 'express'
import { CLIError } from '../utils/error';
import path from 'path'

export const pushCode = async (req: Request, res: Response) => {
    res.json({ message: "File Pushed" })
}
export const getCode = async (req: Request, res: Response) => {
    const { workspace } = req.query
    const username = req.username

    if (!workspace) throw new CLIError(404, "Workspace Not Found");

    const zipPath = path.join(`./uploads/${username}-${workspace}.zip`);

    res.download(zipPath, (err) => {
        if (err) {
            res.status(404).send("No Workspace Found")
        }
    })
}