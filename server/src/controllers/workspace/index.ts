import { Request, Response } from 'express'
import { db } from '../../db';
import { workspaceTable } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
import { CLIError } from '../utils/error';
import { drive } from '../utils/screats';

export const getWorkspaces = async (req: Request, res: Response) => {
    const { option } = req.query;
    if (option && option != 'public' && option != 'private') throw new CLIError(404, "Invalid Options")

    const username = req.username;

    const whereClause = option ?
        and(
            eq(workspaceTable.owner, username as string),
            eq(workspaceTable.visibility_public, option == 'public' ? true : false)
        )
        :
        eq(workspaceTable.owner, username as string);

    const workspaces = await db
        .select({
            name: workspaceTable.name,
            visibility: workspaceTable.visibility_public,
            message: workspaceTable.message
        })
        .from(workspaceTable)
        .where(whereClause)
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    res.json(workspaces)
}

export const deleteWorkspace = async (req: Request, res: Response) => {
    const { name } = req.query;
    const username = req.username;
    if (!name) throw new Error("Invalid Params");

    const [deletedWorkspace] = await db
        .delete(workspaceTable)
        .where(
            and(
                eq(workspaceTable.name, name as string),
                eq(workspaceTable.owner, username as string)
            )
        )
        .returning()
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    if (!deletedWorkspace) throw new CLIError(404, "Workspace Not Found");

    // File Delete On Drive
    await drive.files.delete({
        fileId: deletedWorkspace.zip_id
    }).catch(_ => { })

    res.json({ message: `@${username}/${name} Deleted` })
}

export const getVisibility = async (req: Request, res: Response) => {
    const { name } = req.query;
    const username = req.username;
    if (!name) throw new CLIError(404, "Invalid Params");

    const workspace = await getWorkspaceVisibility(name as string, username!);
    if (!workspace) throw new CLIError(404, "Workspace Not Found");

    res.json({ message: `${!workspace.visibility ? 'Private' : 'Public'}` })
}

export const changeVisibility = async (req: Request, res: Response) => {
    const { name } = req.query;
    const username = req.username;
    if (!name) throw new CLIError(404, "Invalid Params");

    const workspace = await getWorkspaceVisibility(name as string, username!);
    console.log('workspace : ', workspace);

    if (!workspace) throw new CLIError(404, "Workspace Not Found");

    const updatedWorkspace = await db
        .update(workspaceTable)
        .set({
            visibility_public: !workspace.visibility
        })
        .where(
            and(
                eq(workspaceTable.name, name as string),
                eq(workspaceTable.owner, username as string)
            )
        )
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    res.json({ message: `Visibility of ${name} changed to -> ${workspace.visibility ? 'Private' : 'Public'}` })
}

const getWorkspaceVisibility = async (name: string, username: string) => {
    const [workspace] = await db
        .select({
            visibility: workspaceTable.visibility_public
        })
        .from(workspaceTable)
        .where(
            and(
                eq(workspaceTable.name, name),
                eq(workspaceTable.owner, username)
            )
        )
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    return workspace
}