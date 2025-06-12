const { Fetcher } = require('../utils/fetcher');

const deleteWorkspaceommand = (program) => {
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
module.exports = { deleteWorkspaceommand }