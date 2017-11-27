import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import app from './app'
import history from './history'

const reducers = combineReducers({
    form: formReducer,
    router: routerReducer,
    app,
    history
})

export default reducers
