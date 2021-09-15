import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../Login/Login.css"
import { connect } from "react-redux"
import { RegistrationAction } from "../../redux/action/LoginAction";
import { useHistory } from "react-router";

const Registration = (props) => {
    const history = useHistory();
    const { registerUser, RegistrationData } = props;
    const initialState = {
        email: '',
        password: '',
        name: ''
    }
    const initialData = {
        email: '',
        password: '',
        name: ''
    }

    const [data, setData] = useState(initialState);
    const [errors, setError] = useState(initialData);
    const HandleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        switch (name) {
            case 'name':
                if (value.trim() == '') {
                    errors.name = 'Required'
                    break
                }
                if (value.length < 2) {
                    errors.name = 'name is Too Short!'
                    break
                }
                if (!(/^[a-z A-Z]*$/g).test(value)) {
                    errors.name = 'Enter Alphabets only! '
                    break
                }
                errors.name = ''
                break
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
    if (RegistrationData?.registerData) {
        history.push("/sign-in");
    }

    const HandleSubmit = async (e) => {
        console.log(data)
        e.preventDefault();
        await registerUser(data);
    }

    return (
        <div className="login">
            <Form className="loginform">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" onChange={(e) => HandleChange(e)} value={data.name} type="text" placeholder="Enter name" />
                    {errors.name && <Form.Text className="text-danger">
                        {errors.name}
                    </Form.Text>}
                </Form.Group>
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
                <Button variant="primary" disabled={errors.email || errors.password || errors.name !== "" ? true : false} type="submit" onClick={(e) => HandleSubmit(e)}>
                    Registration
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
const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (data) => dispatch(RegistrationAction(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration)