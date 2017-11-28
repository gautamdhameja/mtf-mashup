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
        dispatch({
            type: 'SET_USER',
            passPhrase: values.seed,
            email: values.email
        })
    }
}

export function submitSelections(seed, email, selections) {
    console.log(seed, email, selections)
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