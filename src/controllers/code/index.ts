import { Request, Response } from 'express'
import { CLIError } from '../utils/error';
import path from 'path'

export const pushCode = async (req: Request, res: Response) => {
    res.json({ message: "File Pushed" })
}
export const getCode = async (req: Request, res: Response) => {
    const { workspace } = req.query
    if (!workspace) throw new CLIError(404, "Workspace Not Found");

    const zipPath = path.join(`./uploads/harshiile-wsName.zip`);
    console.log(zipPath);

    res.download(zipPath, (err) => {
        if (err) {
            throw new CLIError(400, "While Reading Pushed Files")
        }
    })
}