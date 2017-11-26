var driver = require('bigchaindb-driver')
var bip39 = require('bip39')
var env = require('./env')

// BigchainDB wrapper
var apiPath = `${env.BDB.HTTP.HOST}:${env.BDB.HTTP.PORT}/api/v1/`
var conn = new driver.Connection(apiPath)

function generateKeypair(passPhrase) {
    var seed = bip39.mnemonicToSeed(passPhrase)
    return new driver.Ed25519Keypair(seed.slice(0, 32))
}

var create = function createTransaction(asset, metadata, passPhrase) {
    return new Promise((resolve, reject) => {
        asset.timestamp = (new Date()).toUTCString()
        var keypair = generateKeypair(passPhrase)
        var condition = driver.Transaction.makeEd25519Condition(keypair.publicKey, true)

        var output = driver.Transaction.makeOutput(condition)

        var transaction = driver.Transaction.makeCreateTransaction(
            asset,
            metadata,
            [output],
            keypair.publicKey
        )

        var txSigned = driver.Transaction.signTransaction(transaction, keypair.privateKey)
        conn.postTransaction(txSigned)
            .then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
            .then(retrievedTx => {
                console.log(retrievedTx)
                resolve(retrievedTx)
            }).catch((err) => reject(err))
    })
}

var update = function updateTransaction(tx, metadata, passPhrase) {
    return new Promise((resolve, reject) => {
        var keypair = generateKeypair(passPhrase)
        var condition = driver.Transaction.makeEd25519Condition(keypair.publicKey)

        var output = driver.Transaction.makeOutput(condition)

        var txTransfer = driver.Transaction.makeTransferTransaction(
            tx,
            metadata,
            [output],
            0
        )

        var txSigned = driver.Transaction.signTransaction(txTransfer, keypair.privateKey)
        conn.postTransaction(txSigned)
            .then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
            .then(retrievedTx => {
                resolve(retrievedTx)
            }).catch((err) => reject(err))
    })
}

module.exports = { create, update }