import fs from 'fs'
import path from 'path'
import archiver from 'archiver'
import { Command } from 'commander';
import FormData from 'form-data'
import axios from 'axios'
import { CLIError } from '../../controllers/utils/error';
import { getToken } from '../utils/token';


export const pushCode = (program: Command) => {
    program
        .command('push')
        .argument('name')
        .argument('folder_path')
        .action(async (name, folder_path) => {

            const token = getToken();
            if (!token) console.log("Token not found, Please Login Again");

            const absPath = path.resolve(`./cli-${Date.now()}.zip`);

            // zip the folder
            await zipFolder(folder_path as string, absPath).catch(err => console.log(err.message));

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
                .then(res => console.log(res))
                .catch(err => { throw new CLIError(500, err.message) })

        });
}



export const zipFolder = (folderPath: string, zipPath: string) => {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        writeStream.on('close', (): any => resolve({}))
        archive.on('error', err => reject({ err }))

        archive.pipe(writeStream)
        archive.directory(folderPath, false)
        archive.finalize()
    })
}