const { Fetcher } = require('../utils/fetcher');

const changeVisibiliyOfWorkspaceCommand = (program) => {
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
module.exports = { changeVisibiliyOfWorkspaceCommand }