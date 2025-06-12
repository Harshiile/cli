import { Request, Response } from 'express'
import { db } from '../../db';
import { userTable } from '../../db/schema';
import { comparePass, encryptPass } from './utils/hashing';
import { eq } from 'drizzle-orm';
import { CLIError } from '../utils/error';

interface User {
    username: string,
    email?: string,
    password: string
}
export const getUser = async (req: Request<{}, {}, User>, res: Response) => {
    const { username, password } = req.body
    console.log({
        username,
        password
    });

    if (!username || !password) res.status(404).send("Invalid Params");

    const [user] = await db
        .select({ password: userTable.password })
        .from(userTable)
        .where(eq(userTable.username, username))
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    if (!user) throw new CLIError(404, "User not exists");

    if (await comparePass(user.password, password)) res.send("User Logged In")
    else throw new CLIError(403, "Incorrect Password");
}

export const addUser = async (req: Request<{}, {}, User>, res: Response) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) throw new Error("Invalid Params");

    await db
        .insert(userTable)
        .values({
            username,
            email,
            password: await encryptPass(password)
        })
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    res.send("User Created")
}