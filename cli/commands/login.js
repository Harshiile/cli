const { Fetcher } = require('../utils/fetcher');
const { createSpinner } = require('nanospinner');
const path = require('path')
const os = require('os')
const fs = require('fs')

const loginCommand = (program) => {
    program
        .command('login')
        .description('Authenticate yourself to start pushing and managing workspaces')
        .arguments('<username>')
        .arguments('<password>')
        .action(async (username, password) => {

            const spinner = createSpinner(`Authenticating "${username}"...`).start();

            await Fetcher({
                url: '/login-user',
                methodType: 'POST',
                needToken: false,
                body: { username, password },
                cb: ({ data }) => {
                    spinner.success({ text: data.message });

                    const JOU_FOLDER_PATH = path.join(os.homedir(), '.jou');
                    const CONFIG_FILE_PATH = path.join(JOU_FOLDER_PATH, 'config.json');

                    try {
                        if (!fs.existsSync(JOU_FOLDER_PATH)) {
                            fs.mkdirSync(JOU_FOLDER_PATH, { recursive: true });
                        }
                        fs.writeFileSync(CONFIG_FILE_PATH, data.token);
                    } catch (err) { throw new Error(err) }
                }
            }).catch(err => {
                spinner.error({ text: err.message || 'Login failed' });
            });
        });
};

module.exports = { loginCommand };
