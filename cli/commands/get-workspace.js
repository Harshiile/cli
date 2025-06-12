const { Fetcher } = require('../utils/fetcher');

const getWorkspaceCommand = (program) => {
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