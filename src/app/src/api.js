import * as driver from 'bigchaindb-driver'
import bip39 from 'bip39'
import request from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';

superagentJsonapify(request);

export const MASHUP_API = ''

export const keypair = (seed) => {
    return new driver.Ed25519Keypair(bip39.mnemonicToSeed(seed).slice(0, 32))
}

const data = '[]'

export const addOffer = (seed, emailaddr, selections) => {
    return new Promise((resolve, reject) => {
        request
            .post(MASHUP_API)
            .type('application/json')
            .send({
                passPhrase: seed,
                files: selections,
                email: emailaddr
            })
            .end((err, resp) => {
                if (resp && resp.body) {
                    console.log(resp)
                    console.log(err)
                    resolve(resp.body)
                } else {
                    resolve({})
                }
            })
    })
}

export const getAllTracks = () => {
    return new Promise((resolve, reject) => {
        resolve(JSON.parse(data))
    })
}
