import { Command } from "commander";
import { Fetcher } from "../utils/fetcher";

export const getVisibiliyOfWorkspaceCommand = (program: Command) => {
    program
        .command('visibility')
        .argument('workspace')
        .action(async (argument) => {
            await Fetcher({
                url: `/get-visibility?name=${argument}`,
                cb: ({ message }) => console.log(message),
                needToken: true
            })
        });
}
