#!/usr/bin/env ts-node

import { Command } from 'commander'

const program = new Command();

program
    .name('cli')
    .description('Helping Section')
    .command('login')
    .arguments('<username>')
    .arguments('<password>')
    .action(async (username, password) => {
        await fetch('http://localhost:3000/get-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.text())
            .then((message) => console.log(message))
            .catch(err => {
                throw new Error(err)
            })
    });

program.parse(process.argv);