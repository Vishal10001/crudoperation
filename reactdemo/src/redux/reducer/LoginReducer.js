const initialState = {
    newData: null,
    registerData: null,
    getData: null,
    error: null
}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_DATA":
            return {
                ...state,
                newData: action.payload,
                error: null
            }
        case "REGISTER_DATA":
            return {
                ...state,
                registerData: action.payload,
                error: null
            }
        case "GET_DATA":
            return {
                ...state,
                getData: action.payload,
                error: null
            }
        case "LOGIN_ERR":
            return {
                ...state,
                error: action.payload
            }
        case "REGISTER_ERR":
            return {
                ...state,
                error: action.payload
            }
        case "GET_ERR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}