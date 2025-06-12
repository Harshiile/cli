import { Fetcher } from "../utils/fetcher";
import { Command } from "commander";

interface WS {
    name: string,
    visibility: boolean
}
export const getWorkspaceCommand = (program: Command) => {
    program
        .command('workspaces ls')
        .option('--public')
        .option('--private')
        .action(async (option) => {


            const url =
                option.public && `/get-workspaces?option=public`
                ||
                option.private && `/get-workspaces?option=private`
                ||
                '/get-workspaces'

            await Fetcher({
                url,
                cb: (workspaces: Array<WS>) => {
                    workspaces?.forEach((ws: WS) => {
                        if (option.public || option.private) console.log(ws.name)
                        else
                            console.log(`${ws.name} - ${ws.visibility ? 'public' : 'private'}`)
                    })
                },
                needToken: true
            })
        });
}
