const initialState = {
    data: []
}

const history = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY':
            return Object.assign({}, {
                data: [
                    ...action.history
                ]
            })
        default:
            return state
    }
}

export default history