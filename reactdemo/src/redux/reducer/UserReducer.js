const initialState = {
    newData: null,
    getData: null,
    editData: null,
    delData: null
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_USER":
            return {
                ...state,
                newData: action.payload
            }
        case "GET_USER":
            return {
                ...state,
                getData: action.payload
            }
        case "EDIT_USER":
            return {
                ...state,
                editData: action.payload
            }
        case "DELETE_USER":
            return {
                ...state,
                delData: action.payload
            }
        default:
            return state
    }
}