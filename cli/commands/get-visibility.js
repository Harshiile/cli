const { Fetcher } = require('../utils/fetcher');
const { createSpinner } = require('nanospinner');

const getVisibiliyOfWorkspaceCommand = (program) => {
    program
        .command('visibility')
        .description('Check visibility of the given workspace')
        .argument('workspace')
        .action(async (argument) => {
            const spinner = createSpinner(`Checking visibility of "${argument}"...`).start();

            await Fetcher({
                url: `/get-visibility?name=${argument}`,
                cb: ({ data }) => {
                    spinner.success({ text: data.message });
                },
                needToken: true
            }).catch(err => {
                spinner.error({ text: err.message || 'Failed to get visibility' });
            });
        });
};

module.exports = { getVisibiliyOfWorkspaceCommand };
