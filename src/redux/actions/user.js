import { FETCH_USER } from './types.js'

export const setUser = (username, token) => ({
    type: FETCH_USER,
    payload: {
        username,
        token
    }
})

