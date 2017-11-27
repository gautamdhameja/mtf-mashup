import { push } from 'react-router-redux'
import bip39 from 'bip39'
import * as api from '../api'

export function generateMnemonic() {
    return {
        type: 'GENERATE_MNEMONIC',
        seed: bip39.generateMnemonic()
    }
}

export function setSeed(values) {
    localStorage.setItem('seed', values.seed)
    return function (dispatch, getState) {
        const keypair = api.keypair(values.seed)
        dispatch({
            type: 'SET_KEYPAIR',
            passPhrase: values.seed,
            publicKey: keypair.publicKey,
            privateKey: keypair.privateKey,
            email: values.email
        })
    }
}

export function submitSelections(seed, email, selections) {
    return function (dispatch, getState) {
        api.addOffer(seed, email, selections)
            .then(tx => {
                console.log(tx)
            })
    }
}

export function getHistory() {
    return function (dispatch, getState) {
    api.getAllTracks()
        .then(data => {
            dispatch({
                type: 'ADD_HISTORY',
                history: data
            })
        })
    }
}