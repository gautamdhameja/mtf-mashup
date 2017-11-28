import * as driver from 'bigchaindb-driver'
import bip39 from 'bip39'
import request from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';

superagentJsonapify(request);

export const MASHUP_API = 'http://mtf-mashup.azurewebsites.net/api/mashups/select'

export const keypair = (seed) => {
    return new driver.Ed25519Keypair(bip39.mnemonicToSeed(seed).slice(0, 32))
}

const data = '[{"artists":"Riikka Hänninen, Vahakn Matossian, Cyril Laurier","description":"Vocals, Electro, Mixing","id":"","track":"1"},{"artists":"Kosti Rytkönen, Dymtro Izotov, Riikka Hänninen, Cyril Laurier","description":"Vocals, Drums, Tongue Drum, Mixing","id":"","track":"2"},{"artists":"Jasmine Idun Isdrake, Riikka Hänninen, Alexander Allen, Stefano Piermatteo, Vahakn Matossian","description":"Vocals, Sensors, Body Implants, Arrangement","id":"","track":"3"},{"artists":"Kimmo Kari","description":"Drums","id":"","track":"4"}]'

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
