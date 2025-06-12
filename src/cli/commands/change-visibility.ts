import { Command } from "commander";
import { Fetcher } from "../utils/fetcher";

export const changeVisibiliyOfWorkspaceCommand = (program: Command) => {
    program
        .command('vis-change')
        .argument('workspace')
        .action(async (argument) => {
            await Fetcher({
                url: `/change-visibility?name=${argument}`,
                methodType: 'PATCH',
                cb: ({ message }) => console.log(message),
                needToken: true
            })
        });
}
