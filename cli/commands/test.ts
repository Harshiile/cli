import { Command } from "commander";

export const testCommand = (program: Command) => {
    program
        .command('test')
        .action(_ => console.log('TESTING.....'))
}
