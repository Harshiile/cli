const { Fetcher } = require('../utils/fetcher');
const { createSpinner } = require('nanospinner')

// Column headers
const headers = ['NAME', 'VISIBILITY', 'MESSAGE'];

// Set column widths
const colWidths = [20, 15, 40];

// Format a row
const formatRow = (cols) =>
    cols.map((col, i) => col.padEnd(colWidths[i])).join('');


const getWorkspaceCommand = (program) => {
    program
        .command('workspaces')
        .description('Retrieve and unzip a previously pushed workspace')
        .option('--public', 'List public workspaces')
        .option('--private', 'List private workspaces')
        .description('List all your saved workspaces (filter with --public / --private)')
        .action(async (option) => {
            const url =
                option.public && `/get-workspaces?option=public`
                ||
                option.private && `/get-workspaces?option=private`
                ||
                '/get-workspaces'

            const spinner = createSpinner("Fetching workspaces...").start();

            await Fetcher({
                url,
                cb: ({ data }) => {
                    spinner.success({ text: "Workspaces\n" });
                    console.log(formatRow(headers));
                    data.forEach(ws => {
                        const row = [
                            ws.name,
                            ws.visibility ? 'Public' : 'Private',
                            ws.message,
                        ];
                        console.log(formatRow(row));
                    })
                },
                needToken: true
            })
                .catch(err => {
                    spinner.error({ text: err.message || 'Failed to fetch workspaces' });
                });
        });
}
module.exports = { getWorkspaceCommand }