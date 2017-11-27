const initialState = {
    seed: null,
    keypair: {
        publicKey: null,
        privateKey: null
    },
    email: null
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'GENERATE_MNEMONIC':
            return Object.assign({}, state, {
                seed: action.seed
            })
        case 'SET_KEYPAIR':
            return Object.assign({}, state, {
                seed: action.passPhrase,
                keypair: {
                    publicKey: action.publicKey,
                    privateKey: action.privateKey,
                },
                email: action.email
            })
        default:
            return state
    }
}

export default app