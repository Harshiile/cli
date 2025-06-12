const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const FormData = require('form-data');
const axios = require('axios');
const { getToken } = require('../utils/token');
const { Fetcher } = require('../utils/fetcher');


const pushCode = (program) => {
    program
        .command('push')
        .argument('name')
        .argument('folder_path')
        .action(async (name, folder_path) => {

            const token = getToken();
            if (!token) console.log("Token not found, Please Login Again");
            let username;
            await Fetcher({
                url: '/get-username',
                cb: (data) => username = data.username,
                needToken: true
            })

            fs.mkdirSync('./.cli', { recursive: true });

            const absPath = path.resolve(`./.cli/cli-${username}-${name}.zip`);

            // zip the folder
            await zipFolder(folder_path, absPath).catch(err => console.log(err.message));

            // uploading
            const form = new FormData();
            form.append('zipFile', fs.createReadStream(absPath));
            form.append('name', name);
            form.append('folderName', path.basename(folder_path));

            const headers = {
                ...form.getHeaders(),
                Authorization: token
            }
            axios.post('http://localhost:3000/push-code', form, {
                headers
            })
                .then(({ data }) => console.log(data.message))
                .catch(err => console.log(err.message))

        });
}
module.exports = { pushCode }


const zipFolder = (folderPath, zipPath) => {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        writeStream.on('close', () => resolve({}))
        archive.on('error', err => reject({ err }))

        archive.pipe(writeStream)
        archive.directory(folderPath, false)
        archive.finalize()
    })
}