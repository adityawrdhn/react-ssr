import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { fetchCircuits } from './api'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()
export const initializeSession = () => ({
    type: 'INITIALIZE_SESSION',
})

const storeData = (data) => ({
    type: 'STORE_DATA',
    data,
})

export const fetchData = (year) => (dispatch) =>
    fetchCircuits(year).then((res) => dispatch(storeData(res)))

const loggedIn = (state = false, action) => {
    switch (action.type) {
        case 'INITIALIZE_SESSION':
            return true
        default:
            return state
    }
}
export const setLang = (payload) => ({ type: 'SET_LANGUAGE', payload })
const language = (state = 'id', action) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return action.payload
        default:
            return state
    }
}

const circuits = (state = [], action) => {
    switch (action.type) {
        case 'STORE_DATA':
            return action.data
        default:
            return state
    }
}

const initialProps = (state = {}, action) => {
    switch (action.type) {
        case 'ASYNC_DATA':
            return action.payload
        default:
            return state
    }
}

const reducer = combineReducers({
    initialProps,
    language,
    loggedIn,
    circuits,
})

export default (initialState) =>
    createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
