import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css"
import axios from "axios"
import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { useHistory } from "react-router";

const Login = (props) => {
    const history = useHistory();
    const { RegistrationData, LoginData } = props;
    const initialState = {
        email: '',
        password: ''
    }
    const initialData = {
        email: '',
        password: ''
    }

    const [data, setData] = useState(initialState);
    const [errors, setError] = useState(initialData);
    const HandleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        switch (name) {
            case 'email':
                if (!validEmailRegex.test(value)) {
                    errors.email = 'Please Enter Valid Email-Address.'
                    break;
                }
                if (value.trim() == '') {
                    errors.email = '*Required'
                    break;
                }
                errors.email = ''
                break;
            case 'password':
                if (value.trim() == '') {
                    errors.password = '*Required'
                    break;
                }
                if (value.length < 8) {
                    errors.password = 'Password is To Short...!'
                    break;
                }
                if (value.length < 0) {
                    errors.password = 'Password error...!'
                }
                errors.password = ''
                break;
        }
        setError({
            ...errors
        })
        setData({
            ...data,
            [name]: value
        })

    }
    const dispatch = useDispatch();
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/admin/login", data)
            if (response.status === 200) {
                localStorage.setItem("userData", JSON.stringify(response.data))
                dispatch({
                    type: "LOGIN_DATA",
                    payload: response.data
                })
                history.push("/")
            }
        }
        catch (err) {
            dispatch({
                type: "LOGIN_ERR",
                payload: err
            })
        }
    }


    return (
        <div className="login">
            <Form className="loginform">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" onChange={(e) => HandleChange(e)} value={data.email} type="email" placeholder="Enter email" />
                    {errors.email && <Form.Text className="text-danger">
                        {errors.email}
                    </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onChange={(e) => HandleChange(e)} value={data.password} type="password" placeholder="Password" />
                    {errors.password && <Form.Text className="text-danger">
                        {errors.password}
                    </Form.Text>}
                </Form.Group>
                <Button variant="primary" disabled={errors.email || errors.password !== "" ? true : false} type="submit" onClick={(e) => HandleSubmit(e)}>
                    Login
                </Button>
            </Form>
        </div>
    )
}
const mapStateToProps = (store) => {
    return {
        RegistrationData: store.RegistrationData
    }
}

export default connect(mapStateToProps, null)(Login)