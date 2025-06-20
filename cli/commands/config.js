const { Fetcher } = require('../utils/fetcher');
const { createSpinner } = require('nanospinner');

const configCommand = (program) => {
    program
        .command('config')
        .description('View your default workspace settings and usage summary')
        .action(async (argument) => {
            const spinner = createSpinner(`Fetching Configuration ...`).start();

            await Fetcher({
                url: `/user-workspaces-metadata`,
                cb: ({ data }) => {
                    spinner.success({ text: "Fetched Configuration" });
                    console.log(`Total Pushed : ${data?.totalPushed}`);
                    console.log(`Total Size : ${data?.totalSum}`);
                    console.log(`Default Visibility Of New Workspace : ${data?.defaultVisibility ? 'Public' : 'Private'}`);
                },
                needToken: true
            }).catch(err => {
                spinner.error({ text: err.message || 'Failed to fetch configuration' });
            });
        });
};

module.exports = { configCommand };
