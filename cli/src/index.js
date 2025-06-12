#!/usr/bin/env node

const { Command } = require('commander');
const { getWorkspaceCommand } = require('../commands/get-workspace');
const { getVisibiliyOfWorkspaceCommand } = require('../commands/get-visibility');
const { changeVisibiliyOfWorkspaceCommand } = require('../commands/change-visibility');
const { deleteWorkspaceommand } = require('../commands/delete-workspace');
const { pushCode } = require('../commands/push-code');
const { getCode } = require('../commands/get-code');
const { testCommand } = require('../commands/test');
const { loginCommand } = require('../commands/login');


const program = new Command();

program
    .name('cli');

loginCommand(program)
getWorkspaceCommand(program)
getVisibiliyOfWorkspaceCommand(program)
changeVisibiliyOfWorkspaceCommand(program)
deleteWorkspaceommand(program)
pushCode(program)
getCode(program)
testCommand(program)

program.parse(process.argv);