import fs from 'fs-extra'
import path from 'path'
import archiver from 'archiver'
import { Command } from 'commander';
import fetch from 'node-fetch'
import axios from 'axios'
import { CLIError } from '../../controllers/utils/error';
import { getToken } from '../utils/token';
import unzipper from 'unzipper';


export const getCode = (program: Command) => {
    program
        .command('get')
        .argument('name')
        .action(async (name) => {

            const token = getToken();
            if (!token) console.log("Token not found, Please Login Again");

            const saveRoot = path.resolve('.cli-code');
            const workspacePath = path.join(saveRoot, name);

            if (!fs.existsSync(path.resolve(saveRoot))) {
                fs.mkdirSync(path.join(saveRoot), { recursive: true })
            }

            const res = await fetch(`http://localhost:3000/get-code?workspace=${name}`, {
                headers: {
                    'authorization': token
                }
            });
            if (!res.ok) {
                const { message } = await res.json() as {
                    message: string
                }
                console.log(message);
                return;
            }

            if (!fs.existsSync(path.resolve(workspacePath))) {
                fs.mkdirSync(path.join(workspacePath), { recursive: true })
            }

            const downloadedZipFile = path.join(saveRoot, 'tmp.zip')
            const fileStream = fs.createWriteStream(downloadedZipFile)
            console.log('Downloading Start');

            await new Promise((resolve, reject) => {
                res.body?.pipe(fileStream);
                res.body?.on('error', reject)
                fileStream.on('finish', () => resolve(1))
            })
            console.log('Unzipping Start');

            // Extract Zip File
            await fs.createReadStream(downloadedZipFile)
                .pipe(unzipper.Extract({ path: path.resolve(workspacePath) }))
                .promise();


            await fs.remove(downloadedZipFile);
        });
}