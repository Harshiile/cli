import { Command } from "commander";
import { Fetcher } from "../utils/fetcher";

export const loginCommand = (program: Command) => {
    program
        .command('login')
        .arguments('<username>')
        .arguments('<password>')
        .action(async (username, password) => {

            await Fetcher({
                url: '/login-user',
                methodType: 'POST',
                needToken: false,
                cb: ({ message }) => console.log(message),
                body: {
                    username,
                    password
                }
            })
        })
}
