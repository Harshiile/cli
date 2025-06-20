const { Fetcher } = require('../utils/fetcher');
const { createSpinner } = require('nanospinner');

const changeVisibiliyOfWorkspaceCommand = (program) => {
    program
        .command('vis-change')
        .argument('workspace')
        .description('Toggle the visibility (public/private) of a workspace')
        .action(async (argument) => {
            const spinner = createSpinner(`Toggling visibility of "${argument}"...`).start();

            await Fetcher({
                url: `/change-visibility?name=${argument}`,
                methodType: 'PATCH',
                cb: ({ data }) => {
                    spinner.success({ text: data.message });
                },
                needToken: true
            }).catch(err => {
                spinner.error({ text: err.message || 'Failed to toggle visibility' });
            });
        });
};

module.exports = { changeVisibiliyOfWorkspaceCommand };
