import fs from 'fs-extra'
import path from 'path'
import { Command } from 'commander';
import fetch from 'node-fetch'
import { getToken } from '../utils/token';
import unzipper from 'unzipper';
import { Fetcher } from '../utils/fetcher';


export const getCode = (program: Command) => {
    program
        .command('get')
        .argument('name')
        .action(async (name) => {

            // Getting Token
            const token = getToken();
            if (!token) console.log("Token not found, Please Login Again");

            let username;
            await Fetcher({
                url: '/get-username',
                cb: (data) => username = data.username,
                needToken: true
            })
            if (username) {
                const saveRoot = path.resolve('.cli-code'); // .cli-code folder
                const userPath = path.join(saveRoot, username); // .cli-code/user folder
                const workspacePath = path.join(userPath, name); // .cli-code/user/workspane folder

                // Create .cli-code if not exists
                if (!fs.existsSync(path.resolve(saveRoot))) {
                    fs.mkdirSync(path.join(saveRoot), { recursive: true })
                }

                // download zip file
                try {

                    const res = await fetch(`http://localhost:3000/get-code?workspace=${name}`, {
                        headers: {
                            'authorization': token
                        }
                    });

                    if (!res.ok) {
                        const error = await res.text()
                        console.log(error);
                        return;
                    }

                    // Create .cli-code/user folder
                    if (!fs.existsSync(path.resolve(userPath))) {
                        fs.mkdirSync(path.join(userPath), { recursive: true })
                    }

                    // Create .cli-code/user/workspace folder
                    if (!fs.existsSync(path.resolve(workspacePath))) {
                        fs.mkdirSync(path.join(workspacePath), { recursive: true })
                    }

                    const downloadedZipFile = path.join(workspacePath, 'tmp.zip')

                    const fileStream = fs.createWriteStream(downloadedZipFile)
                    console.log('Downloading Start');

                    // Receiving file in .cli-code/workspace/
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

                    // Removing tmp.zip file
                    await fs.remove(downloadedZipFile);

                    console.log(`Code arrived at : '.cli-code/${username}/${name}'`)
                } catch (err) {
                    if (err instanceof Error) {
                        console.log(err.message);
                    }
                }
            }
            else console.log('Username not found')
        });
}