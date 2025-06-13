const { Fetcher } = require('../utils/fetcher');

const getWorkspaceCommand = (program) => {
    program
        .command('workspaces')
        .description('Retrieve and unzip a previously pushed workspace')
        .option('--public', 'List public workspaces')
        .option('--private', 'List private workspaces')
        .description('List all your saved workspaces (filter with --public / --private)')
        .action(async (option) => {
            const url =
                option.public && `/get-workspaces?option=public`
                ||
                option.private && `/get-workspaces?option=private`
                ||
                '/get-workspaces'

            await Fetcher({
                url,
                cb: (workspaces) => {
                    workspaces?.forEach((ws) => {
                        if (option.public || option.private) console.log(ws.name)
                        else
                            console.log(`${ws.name} - ${ws.visibility ? 'public' : 'private'}`)
                    })
                },
                needToken: true
            })
        });
}
module.exports = { getWorkspaceCommand }