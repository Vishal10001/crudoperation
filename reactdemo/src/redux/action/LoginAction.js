import axios from "axios";



export const RegistrationAction = (data) => {

    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/admin/createuser", data)
            if (response.status === 200) {
                dispatch({
                    type: "REGISTER_DATA",
                    payload: response.data
                })
            }
        }
        catch (err) {
            dispatch({
                type: "REGISTER_ERR",
                payload: err
            })
            console.log(err)
        }
    }
}

export const GetRegisterUser = (data) => {

    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/admin/getalluser")
            if (response.status === 200) {
                dispatch({
                    type: "GET_DATA",
                    payload: response.data
               })
            }
        }
        catch (err) {
            dispatch({
                type: "GET_ERR",
                payload: err
            })
        }
    }
}