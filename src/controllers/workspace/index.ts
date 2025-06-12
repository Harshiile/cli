import { Request, Response } from 'express'
import { db } from '../../db';
import { workspaceTable } from '../../db/schema';
import { and, eq } from 'drizzle-orm';
import { CLIError } from '../utils/error';

export const getWorkspaces = async (req: Request, res: Response) => {
    const { uname, option } = req.query;

    if (!uname) throw new Error("Invalid Params");
    if (option && option != 'public' && option != 'private') throw new CLIError(404, "Invalid Options")

    const whereClause = option ?
        and(
            eq(workspaceTable.owner, uname as string),
            eq(workspaceTable.visibility_public, option == 'public' ? true : false)
        )
        :
        eq(workspaceTable.owner, uname as string);

    const workspaces = await db
        .select({
            name: workspaceTable.name,
            visibility: workspaceTable.visibility_public
        })
        .from(workspaceTable)
        .where(whereClause)
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    res.json(workspaces)
}

export const deleteWorkspace = async (req: Request, res: Response) => {
    const { name } = req.query;

    if (!name) throw new Error("Invalid Params");

    await db
        .delete(workspaceTable)
        .where(eq(workspaceTable.name, name as string))
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    res.send(`${name} Deleted`)
}

export const getVisibility = async (req: Request, res: Response) => {
    const { name } = req.query;
    if (!name) throw new CLIError(404, "Invalid Params");

    const workspace = await getWorkspaceVisibility(name as string);
    if (!workspace) throw new CLIError(404, "Workspace Not Found");

    res.send(`${!workspace.visibility ? 'private' : 'public'}`)
}

export const changeVisibility = async (req: Request, res: Response) => {
    const { name } = req.query;

    if (!name) throw new CLIError(404, "Invalid Params");

    const workspace = await getWorkspaceVisibility(name as string);

    if (!workspace) throw new CLIError(404, "Workspace Not Found");

    await db
        .update(workspaceTable)
        .set({
            visibility_public: !workspace.visibility
        })
        .where(eq(workspaceTable.name, name as string))
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    res.json(`Visibility of ${name} changed to -> ${workspace.visibility ? 'private' : 'public'}`)
}

const getWorkspaceVisibility = async (name: string) => {
    const [workspace] = await db
        .select({
            visibility: workspaceTable.visibility_public
        })
        .from(workspaceTable)
        .where(eq(workspaceTable.name, name))
        .catch(_ => { throw new CLIError(500, "Failed, Try Again") });

    return workspace
}