const fs = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');
const { getToken } = require('../utils/token');
const unzipper = require('unzipper');
const { Fetcher } = require('../utils/fetcher');


const getCode = (program) => {
    program
        .command('get')
        .description('Retrieve and unzip a previously pushed workspace')
        .argument('workspace')
        .action(async (workspace) => {

            // Getting Token
            const token = getToken();
            if (!token) console.log("Token not found, Please Login Again");

            // download zip file
            try {
                const res = await fetch(`http://localhost:3000/get-code?workspace=${workspace}`, {
                    headers: {
                        'authorization': token
                    }
                });


                if (!res.ok) {
                    const error = await res.json()
                    console.log(error.message);
                    return;
                }
                console.log(await res.json());

                console.log('Downloading Start');

                // const saveRoot = path.resolve('.cli-code'); // .cli-code folder
                // const userPath = path.join(saveRoot, username); // .cli-code/user folder
                // const workspacePath = path.join(userPath, name); // .cli-code/user/workspane folder

                // // Create .cli-code if not exists
                // if (!fs.existsSync(path.resolve(saveRoot))) {
                //     fs.mkdirSync(path.join(saveRoot), { recursive: true })
                // }

                // // Create .cli-code/user folder
                // if (!fs.existsSync(path.resolve(userPath))) {
                //     fs.mkdirSync(path.join(userPath), { recursive: true })
                // }

                // // Create .cli-code/user/workspace folder
                // if (!fs.existsSync(path.resolve(workspacePath))) {
                //     fs.mkdirSync(path.join(workspacePath), { recursive: true })
                // }

                // const downloadedZipFile = path.join(workspacePath, 'tmp.zip')

                // const fileStream = fs.createWriteStream(downloadedZipFile)

                // // Receiving file in .cli-code/workspace/
                // await new Promise((resolve, reject) => {
                //     res.body?.pipe(fileStream);
                //     res.body?.on('error', reject)
                //     fileStream.on('finish', () => resolve(1))
                // })
                // console.log('Unzipping Start');

                // // Extract Zip File
                // await fs.createReadStream(downloadedZipFile)
                //     .pipe(unzipper.Extract({ path: path.resolve(workspacePath) }))
                //     .promise();

                // // Removing tmp.zip file
                // await fs.remove(downloadedZipFile);

                // console.log(`Code arrived at : '.cli-code/${username}/${name}'`)
            } catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                }
            }
        });
}
module.exports = { getCode }