const { createSpinner } = require('nanospinner');
const { getProgram } = require('../solana-program');

const checkWeb3Command = (program) => {
    program
        .command('web')
        .description('Testing Solana Program')
        .action(async (argument) => {
            const spinner = createSpinner(`Testing Solana Program...`).start();

            const solanaProgram = getProgram();

            const data = await solanaProgram.account.tweet.all([
                {
                    memcmp: {
                        offset: 8,
                        bytes: 'Ds9cijM84LFu5phqCWadfZrEqMYdt22Duoa4q97NHruC',
                    },
                },
            ]).catch(err => {
                spinner.error({ text: 'Testing Error.....' });
            });

            spinner.success({ text: "Fetched Tweets" });


            console.table(data?.map(tweet => {
                return {
                    message: tweet?.account?.message,
                    time: new Date(tweet?.account?.time.toNumber() * 1000).toLocaleString(),
                    publicKey: tweet?.publicKey?.toBase58(),
                }
            }));

        });
};

module.exports = { checkWeb3Command };
