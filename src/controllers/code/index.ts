import { Request, Response } from 'express'
import { CLIError } from '../utils/error';

export const getCode = async (req: Request, res: Response) => {
    console.log({ file: req.file });
    console.log({ files: req.files });

    res.json({ message: "Hello" })
}