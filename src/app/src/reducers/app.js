const initialState = {
    seed: null,
    email: null
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'GENERATE_MNEMONIC':
            return Object.assign({}, state, {
                seed: action.seed
            })
        case 'SET_USER':
            return Object.assign({}, state, {
                seed: action.passPhrase,
                email: action.email
            })
        default:
            return state
    }
}

export default app