const { Fetcher } = require('../utils/fetcher');

const getVisibiliyOfWorkspaceCommand = (program) => {
    program
        .command('visibility')
        .description('Check visibility of the given workspace')
        .argument('workspace')
        .action(async (argument) => {
            await Fetcher({
                url: `/get-visibility?name=${argument}`,
                cb: ({ message }) => console.log(message),
                needToken: true
            })
        });
}
module.exports = { getVisibiliyOfWorkspaceCommand }