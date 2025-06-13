import { Request, Response } from 'express'
import { db } from '../../db';
import { userTable } from '../../db/schema';
import { comparePass, encryptPass } from './utils/hashing';
import { eq } from 'drizzle-orm';
import { CLIError } from '../utils/error';
import os from 'os';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk'
import { jwtGenerate } from '../utils/jwt';


interface User {
    username: string,
    email?: string,
    password: string
}

const getUser = async (username: string) => {
    const [user] = await db
        .select({ password: userTable.password })
        .from(userTable)
        .where(eq(userTable.username, username))
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });
    return user;
}

export const loginUser = async (req: Request<{}, {}, User>, res: Response) => {
    const { username, password } = req.body
    if (!username || !password) throw new CLIError(404, "Invalid Params");

    const user = await getUser(username);

    if (!user) throw new CLIError(404, `User not exists, You can sign up at ${chalk.blue('http://localhost:3000/signup')}`);

    if (await comparePass(user.password, password)) {
        // Make .config 
        const JOU_FOLDER_PATH = path.join(os.homedir(), '.jou');
        const CONFIG_FILE_PATH = path.join(JOU_FOLDER_PATH, 'config.json');
        const token = jwtGenerate({ username })


        try {
            if (!fs.existsSync(JOU_FOLDER_PATH)) {
                fs.mkdirSync(JOU_FOLDER_PATH, { recursive: true });
            }
            fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify({ token }));
            console.log("✅ Config written to ", CONFIG_FILE_PATH);
        } catch (err) {
            console.error("❌ Error writing config:  ", err);
        }

        res.json({ message: "User Logged In" })
    }
    else throw new CLIError(400, "Incorrect Password");
}

export const addUser = async (req: Request<{}, {}, User>, res: Response) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) throw new CLIError(404, "Invalid Params");

    const user = await getUser(username);
    if (user) throw new CLIError(400, "User Already Exists");

    await db
        .insert(userTable)
        .values({
            username,
            email,
            password: await encryptPass(password)
        })
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    res.json({ message: "User Created" })
}


export const getUsername = async (req: Request, res: Response) => {
    res.json({
        username: req.username
    })
}

export const testAPI = async (req: Request, res: Response) => {
    res.json({
        message: "Testing Done"
    })
}