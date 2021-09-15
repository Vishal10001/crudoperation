import axios from "axios"

export const createAction = (Data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:3001/users/registration`, Data)
            if (response.status === 200) {
                dispatch({
                    type: "CREATE_USER",
                    payload: response.data
                })
                dispatch(GetAction())
            } else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const GetAction = () => {
    console.log("this is run get action");
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/users/getStudent")
            if (response.status === 200) {
                console.log(response.data)
                dispatch({
                    type: "GET_USER",
                    payload: response.data
                })
            } else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const EditAction = (data) => {
    console.log(data);
    const id = data?._id;
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3001/users/editUser/${id}`, data)
            if (response.status === 200) {
                dispatch(GetAction())
                dispatch({
                    type: "EDIT_USER",
                    payload: response.data
                })
            } else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const DeleteAction = (data) => {
    console.log(data);
    const id = data?._id;
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3001/users/deleteuser/${id}`)
            if (response.status === 200) {
                dispatch(GetAction())
                dispatch({
                    type: "DELETE_USER",
                    payload: response.data
                })
            } else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }
}
