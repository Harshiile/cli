const { Connection } = require('@solana/web3.js')
const anchor = require("@coral-xyz/anchor");
const { Idl } = require('./idl')

const getProvider = (wallet) => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    return new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: "processed",
    });
}

const getProgram = (wallet) => {
    const provider = getProvider(wallet);
    return new anchor.Program(Idl, provider)
}

module.exports = { getProgram }