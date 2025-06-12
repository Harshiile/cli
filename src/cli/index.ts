#!/usr/bin/env ts-node

import { Command } from 'commander'
import { loginCommand } from './commands/login';
import { getWorkspaceCommand } from './commands/get-workspace';
import { getVisibiliyOfWorkspaceCommand } from './commands/get-visibility';
import { changeVisibiliyOfWorkspaceCommand } from './commands/change-visibility';
import { deleteWorkspaceommand } from './commands/delete-workspace';
import { pushCode } from './commands/push-code';
import { getCode } from './commands/get-code';

const program = new Command();

program
    .name(process.env.CLI_NAME!);
// .description('Code Saver');

loginCommand(program)
getWorkspaceCommand(program)
getVisibiliyOfWorkspaceCommand(program)
changeVisibiliyOfWorkspaceCommand(program)
deleteWorkspaceommand(program)
pushCode(program)
getCode(program)

program.parse(process.argv);