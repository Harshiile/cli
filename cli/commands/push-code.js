const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const FormData = require('form-data');
const axios = require('axios');
const { getToken } = require('../utils/token');
const { Fetcher } = require('../utils/fetcher');


const pushCode = (program) => {
    program
        .command('push')
        .description('Push a local folder (zipped automatically) to cloud storage')
        .argument('name')
        .argument('folder_path')
        .option("-m, --message <message>")
        .action(async (name, folder_path, msg) => {

            const token = getToken();
            if (!token) console.log("Token not found, Please Login Again");
            let username;
            await Fetcher({
                url: '/get-username',
                cb: (data) => username = data.username,
                needToken: true
            })

            fs.mkdirSync('./.cli', { recursive: true });

            const absPath = path.resolve(`./.cli/${username}-${name}.zip`);
            console.log('Fetching Files...');

            // zip the folder
            await zipFolder(folder_path, absPath).catch(err => console.log(err.message));

            console.log('Files Pushing');
            // uploading
            const form = new FormData();
            form.append('zipFile', fs.createReadStream(absPath));
            form.append('name', name);
            form.append('message', msg.message);

            const headers = {
                ...form.getHeaders(),
                Authorization: token
            }
            axios.post('http://localhost:3000/push-code', form, {
                headers
            })
                .then(({ data }) => console.log(data.message))
                .catch(err => console.log(err.message))
            // Deleting .cli folder
            await fs.remove(path.join('./.cli'))
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