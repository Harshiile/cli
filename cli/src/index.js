#!/usr/bin/env node

const { Command } = require('commander');
const { getWorkspaceCommand } = require('../commands/get-workspace');
const { getVisibiliyOfWorkspaceCommand } = require('../commands/get-visibility');
const { changeVisibiliyOfWorkspaceCommand } = require('../commands/change-visibility');
const { deleteWorkspaceommand } = require('../commands/delete-workspace');
const { pushCode } = require('../commands/push-code');
const { getCode } = require('../commands/get-code');
const { loginCommand } = require('../commands/login');
const { changeDefaultVisibility } = require('../commands/change-default-visibility');
const { configCommand } = require('../commands/config');
const { checkWeb3Command } = require('../commands/checkWeb3');


const program = new Command();

program
    .name('cli')
    .version('1.0.0')
    .description(`
        🛠️ JOU CLI: Save, Push, and Retrieve Your Code Workspaces Effortlessly!

        Commands allow developers to:
        - 🔐 Securely login
        - 💾 Push code folders as zip to cloud
        - 🧠 Retrieve previously saved workspaces
        - 🧮 Manage visibility and workspace metadata
        `);

loginCommand(program)
getWorkspaceCommand(program)
getVisibiliyOfWorkspaceCommand(program)
changeVisibiliyOfWorkspaceCommand(program)
deleteWorkspaceommand(program)
pushCode(program)
getCode(program)
changeDefaultVisibility(program)
configCommand(program)
checkWeb3Command(program)

program.parse(process.argv);