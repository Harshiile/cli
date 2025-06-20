const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const FormData = require('form-data');
const axios = require('axios');
const { getToken } = require('../utils/token');
const { Fetcher } = require('../utils/fetcher');
const { createSpinner } = require('nanospinner');

const pushCode = (program) => {
    program
        .command('push')
        .description('Push a local folder (zipped automatically) to cloud storage')
        .argument('name')
        .argument('folder_path')
        .option("-m, --message <message>")
        .action(async (name, folder_path, msg) => {
            const token = getToken();
            if (!token) {
                console.log("Token not found, Please Login Again");
                return;
            }

            let username;
            const zipSpinner = createSpinner('Zipping folder...').start();

            await Fetcher({
                url: '/get-username',
                methodType: 'POST',
                cb: ({ data }) => username = data.username,
                needToken: true
            }).catch(err => userSpinner.error({ text: err.message }));

            fs.mkdirSync('./.jou', { recursive: true });

            const absPath = path.resolve(`./.jou/${username}-${name}.zip`);

            await zipFolder(folder_path, absPath)
                .then(() => zipSpinner.success({ text: 'Zipped successfully' }))
                .catch(err => {
                    zipSpinner.error({ text: err.message });
                    return;
                });

            const uploadSpinner = createSpinner('Uploading files...').start();

            const form = new FormData();
            form.append('zipFile', fs.createReadStream(absPath));
            form.append('name', name);
            form.append('message', msg.message);


            // Push to IPFS from here
            // Save data on blockchain

            await axios.post('https://jou-cli.onrender.com/push-code', form, {
                headers: {
                    ...form.getHeaders(),
                    'authorization': token
                }
            })
                .then(({ data }) => uploadSpinner.success({ text: data.message }))
                .catch(({ response }) => {
                    uploadSpinner.error({ text: response.data.message });
                    return;
                });

            const cleanupSpinner = createSpinner('Cleaning up temporary files...').start();
            await fs.remove(path.join('./.jou'))
                .then(() => cleanupSpinner.success({ text: 'Cleanup done' }))
                .catch(err => cleanupSpinner.error({ text: err.message }));
        });
};

module.exports = { pushCode };

const zipFolder = (folderPath, zipPath) => {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        writeStream.on('close', () => resolve({}));
        archive.on('error', err => reject({ err }));

        archive.pipe(writeStream);
        archive.directory(folderPath, false);
        archive.finalize();
    });
};
