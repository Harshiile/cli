import { Request, Response } from 'express'

export const getUsername = async (req: Request, res: Response) => {
    res.json({ username: req.username })
}