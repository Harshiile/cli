const testCommand = (program) => {
    program
        .command('test')
        .action(_ => console.log('TESTING.....'))
}
module.exports = { testCommand }