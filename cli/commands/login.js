const { Fetcher } = require('../utils/fetcher');

const loginCommand = (program) => {
    program
        .command('login')
        .arguments('<username>')
        .arguments('<password>')
        .action(async (username, password) => {

            await Fetcher({
                url: '/login-user',
                methodType: 'POST',
                needToken: false,
                cb: ({ message }) => console.log(message),
                body: {
                    username,
                    password
                }
            })
        })
}
module.exports = { loginCommand }