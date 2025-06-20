const { Fetcher } = require('../utils/fetcher');
const { createSpinner } = require('nanospinner');
const inquirer = require('inquirer');

const changeDefaultVisibility = (program) => {
    program
        .command('def-vis-change')
        .description('Toggle the default visibility (requires password)')
        .action(async () => {
            const prompt = inquirer.createPromptModule();

            const { password } = await prompt([
                {
                    type: 'password',
                    name: 'password',
                    message: 'Enter your password:',
                    mask: '•',
                },
            ]);

            const spinner = createSpinner('Changing default visibility...').start();

            try {
                const { data } = await Fetcher({
                    url: `/change-default-visibility`,
                    methodType: 'PATCH',
                    body: { password },
                    needToken: true,
                });

                spinner.success({ text: data.message || 'Default visibility changed successfully.' });
            } catch (err) {
                spinner.error({ text: `Failed to change visibility: ${err.message}` });
            }
        });
};

module.exports = { changeDefaultVisibility };
