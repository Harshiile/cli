const fs = require('fs-extra');
const path = require('path');
const { getToken } = require('../utils/token');
const unzipper = require('unzipper');
const { createSpinner } = require('nanospinner');
const axios = require('axios');
const { pipeline } = require('stream/promises')

const getCode = (program) => {
    program
        .command('get')
        .description('Retrieve and unzip a previously pushed workspace')
        .argument('workspace')
        .action(async (workspace) => {


            // User can give output folder path, if exist, copy there & if not make it & copied files there


            const token = getToken();
            if (!token) {
                console.log("Token not found, Please Login Again");
                return;
            }

            let spinner;
            try {

                const wsWithName = workspace.split('/');
                if (wsWithName.length != 2) { throw new Error("Invalid Workspace") }

                spinner = createSpinner(`Fetching "${workspace}"...`).start();

                const username = wsWithName[0];
                const name = wsWithName[1];


                const res = await axios.get(`https://jou-cli.onrender.com/get-code?workspace=${workspace}`, {
                    responseType: 'stream',
                    headers: { 'authorization': token }
                })
                    .catch(({ response }) => {
                        throw new Error(response.data.message)
                    })

                spinner.success({ text: 'Fetched metadata successfully' });

                const saveRoot = path.resolve('.jou-code');
                const userPath = path.join(saveRoot, username);
                const workspacePath = path.join(userPath, name);

                [saveRoot, userPath, workspacePath].forEach(dir => {
                    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                });

                const downloadedZipFile = path.join(workspacePath, 'tmp.zip');
                const fileStream = fs.createWriteStream(downloadedZipFile);

                const downloadSpinner = createSpinner('Downloading zip...').start();

                await new Promise((resolve, reject) => {
                    res.data.pipe(fileStream);
                    res.data.on('error', reject);
                    fileStream.on('finish', resolve);
                });

                downloadSpinner.success({ text: 'Download complete' });

                const unzipSpinner = createSpinner('Unzipping file...').start();

                await fs.createReadStream(downloadedZipFile)
                    .pipe(unzipper.Extract({ path: path.resolve(workspacePath) }))
                    .promise();

                unzipSpinner.success({ text: 'Unzipped successfully' });
                const codeArrived = createSpinner('Code arriving ...').start();

                await fs.remove(downloadedZipFile);

                codeArrived.success({ text: `Code arrived at : .jou-code/${username}/${name}` });

            } catch (err) {
                spinner?.error({ text: err.message || 'Unknown error' });
            }
        });
};

module.exports = { getCode };
