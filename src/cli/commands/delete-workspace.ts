import { Command } from "commander";
import { Fetcher } from "../utils/fetcher";

export const deleteWorkspaceommand = (program: Command) => {
    program
        .command('delete')
        .argument('workspace')
        .action(async (argument) => {
            await Fetcher({
                url: `/delete-workspace?name=${argument}`,
                methodType: 'DELETE',
                cb: ({ message }) => console.log(message),
                needToken: true
            })
        });
}
