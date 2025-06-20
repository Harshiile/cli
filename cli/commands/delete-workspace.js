const { Fetcher } = require('../utils/fetcher');
const { createSpinner } = require('nanospinner');
const inquirer = require('inquirer');

const deleteWorkspaceommand = (program) => {
    program
        .command('delete')
        .argument('workspace')
        .description('Delete a workspace permanently')
        .action(async (argument) => {
            const prompt = inquirer.createPromptModule();

            const { password } = await prompt([
                {
                    type: 'password',
                    name: 'password',
                    message: 'Enter your password:',
                    mask: '•',
                },
            ]);

            const spinner = createSpinner(`Deleting workspace "${argument}"...`).start();

            await Fetcher({
                url: `/delete-workspace?name=${argument}`,
                methodType: 'DELETE',
                body: { password },
                cb: ({ data }) => {
                    spinner.success({ text: data.message });
                },
                needToken: true
            }).catch(err => {
                spinner.error({ text: err.message || 'Deletion failed' });
            });
        });
};

module.exports = { deleteWorkspaceommand };
