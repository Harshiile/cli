import { Request, Response } from 'express'
import path from 'path'
import { CLIError } from '../utils/error'
import busboy from 'busboy';
import { drive } from '../utils/screats';
import { db } from '../../db';
import { workspaceTable } from '../../db/schema';
import { and, eq } from 'drizzle-orm';

interface FileMetadata {
    filename: string
    encoding: string
    mimeType: string
}

export const pushCode = async (req: Request, res: Response) => {
    const username = req.username
    const bb = busboy({ headers: req.headers });
    const fileData = {
        id: '',
        name: ''
    }
    const fields: Record<string, string> = {};
    bb.on('field', (fieldname, value) => {
        fields[fieldname] = value;
    })


    const uploadPromises: Promise<void>[] = [];
    bb.on('file', async (fieldname: string, file: NodeJS.ReadStream, fileMetadata: FileMetadata) => {
        const uploadPromise = (async () => {
            try {
                const contentLength = req.headers['content-length'];

                const driveRes = await drive.files.create({
                    requestBody: {
                        name: fileMetadata.filename,
                        parents: [process.env.DRIVE_THUMBNAIL_FOLDER_ID!],
                        mimeType: 'application/zip',
                    },
                    media: {
                        mimeType: 'application/zip',
                        body: file,
                    },
                    fields: 'id, name'
                },
                    {
                        onUploadProgress: (progress) => {
                            const uploaded = progress.bytesRead || progress.loaded;
                            const percent = Math.round((uploaded * 100) / Number(contentLength));
                            console.log(`Upload progress : ${percent}%`);
                        }
                    }
                );

                const dbData = {
                    name: fields?.name,
                    owner: username as string,
                    zip_id: driveRes.data.id as string,
                    message: fields?.message || '',
                    visibility_public: false
                }

                await db
                    .insert(workspaceTable)
                    .values(dbData)
                    .catch(err => { throw new CLIError(400, "Code Uploading Failed") })

            } catch (err) {
                console.error('Error uploading to Drive:', err);
                throw new CLIError(500, 'Failed to upload to Google Drive');
            }
        })();

        uploadPromises.push(uploadPromise);
    });


    bb.on('finish', async () => {
        try {
            await Promise.all(uploadPromises);

            res.json({
                message: 'Upload successful',
                file: fileData
            });
        } catch (err) {
            if (err instanceof CLIError) {
                res.status(err.statusCode).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'Unexpected error during file upload' });
            }
        }
    });

    bb.on('error', (err) => {
        if (err instanceof Error)
            throw new CLIError(400, err.message)
    })

    req.pipe(bb);


}



export const getCode = async (req: Request, res: Response) => {
    const query = req.query
    const username = req.username

    const workspace = query.workspace as string

    if (!workspace) throw new CLIError(404, "Workspace Not Found");

    const wsWithName = workspace.split('/');
    if (wsWithName.length != 2) throw new CLIError(400, "Invalid Workspace");

    const wsUsername = wsWithName[0];
    const wsName = wsWithName[1];

    const [ws] = await db
        .select({
            zipFileId: workspaceTable.zip_id,
            visibilityPublic: workspaceTable.visibility_public,
            usernameOfWorkspace: workspaceTable.owner
        })
        .from(workspaceTable)
        .where(eq(workspaceTable.name, wsName));

    if (!ws) throw new CLIError(404, "Workspace Not Found");

    console.log({
        dbUsername: ws.usernameOfWorkspace,
        username
    });

    if (!ws.visibilityPublic && ws.usernameOfWorkspace != wsUsername) throw new CLIError(404, "Workspace Not Found");

    try {
        const driveStream = await drive.files.get(
            {
                fileId: ws.zipFileId,
                alt: 'media'
            },
            {
                responseType: 'stream'
            }
        );

        driveStream.data.pipe(res);
    } catch (error) {
        console.error('Error downloading from Google Drive:', error);
        res.status(500).json({ error: 'Failed to download file' });
    }
}