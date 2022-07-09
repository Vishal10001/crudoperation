import { Form, Button, Row, Col } from "react-bootstrap"
import { useEffect, useState } from 'react';
import { Table, Space } from "antd";
import { connect } from "react-redux"
import { createAction, DeleteAction, EditAction, GetAction } from "../../redux/action/UserAction";
import "./UserEntery.css";


export const sortArray = (a, b, keyword) => {
    console.log(a, b)
    let a_copy = a[keyword] ? a[keyword] : 'zzzz';
    let b_copy = b[keyword] ? b[keyword] : 'zzzz';
    return a_copy.toString().localeCompare(b_copy.toString());
};


const UserEntry = (props) => {

    const { editUserData, deleteData, createUserData, UserData, getUserData } = props;
    console.log(UserData)
    const initialState = {
        studentname: '',
        rollno: '',
        branch: '',
        email: '',
        gender: '',
        registerd: '',
        bdate: ''
    }

    const initialData = {
        studentname: '',
        rollno: '',
        branch: '',
        email: '',
        gender: '',
        bdate: ''
    }

    const [data, setData] = useState(initialState);
    const [errors, setError] = useState(initialData);

    const onChange = (e) => {
        const { name, value } = e.target;
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        switch (name) {
            case 'studentname':
                if (value.trim() == '') {
                    errors.studentname = 'Required'
                    break
                }
                if (value.length < 2) {
                    errors.studentname = 'name is Too Short!'
                    break
                }
                if (!(/^[a-z A-Z]*$/g).test(value)) {
                    errors.studentname = 'Enter Alphabets only! '
                    break
                }
                errors.studentname = ''
                break
            case 'rollno':
                if (value.trim() == '') {
                    errors.rollno = 'Required'
                    break
                }
                if (!(/^[0-9]*$/g).test(value)) {
                    errors.rollno = 'Enter Numbers only! '
                    break
                }
                errors.rollno = ''
                break
            case 'branch':
                if (value.trim() == '') {
                    errors.branch = 'Required'
                    break
                }
                errors.branch = ''
                break
            case 'gender':
                if (value.trim() == '') {
                    errors.gender = 'Required'
                    break
                }
                errors.gender = ''
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
            case 'bdate':
                if (value.trim() == '') {
                    errors.bdate = '*Required'
                    break;
                }
                errors.bdate = ''
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
    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (data?._id) {
            console.log("enter edit")
            await editUserData(data)
        } else {
            await createUserData(data);
        }
        setData(initialState);
    }

    useEffect(() => {
        getUserData();
    }, [])

    const HandleDelete = (data) => {
        if (window.confirm('Are you sure you want to Delete Record')) {
            deleteData(data);
        }
    }
    const entriesDashboardColumns = [
        {
            title: 'Studet Name',
            dataIndex: 'studentname',
            sorter: (a, b) => sortArray(a, b, 'studentname'),
        },
        {
            title: 'Roll number',
            dataIndex: 'rollno',
            sorter: (a, b) => sortArray(a, b, 'rollno'),
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            sorter: (a, b) => sortArray(a, b, 'branch'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => sortArray(a, b, 'email'),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            sorter: (a, b) => sortArray(a, b, 'gender'),
        },
        {
            title: 'Birth Date',
            dataIndex: 'bdate',
            sorter: (a, b) => sortArray(a, b, 'bdate'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button style={{ color: "white", background: "green" }} onClick={() => setData(record)} >Edit </Button>
                    <Button style={{ color: "white", background: "red" }} onClick={() => HandleDelete(record)}>Delete</Button>
                </Space>
            )
        }
    ];
    const HandleChange = (e) => {
        console.log(e);
    }

    return (
        <div>
            <div className="login">
                <Form className="w-100 p-3 h-100 d-flex flex-column loginform">
                    <Form.Group className="mb-3" >
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name="studentname" value={data.studentname} type="text" placeholder="Enter name" />
                        {errors?.studentname && <Form.Text className="text-danger">
                            {errors.studentname}
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Roll number</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name="rollno" value={data.rollno} type="text" placeholder="Enter Roll number" />
                        {errors?.rollno && <Form.Text className="text-danger">
                            {errors.rollno}
                        </Form.Text>}
                    </Form.Group>
                    <Form.Label>Branch Name</Form.Label>
                    <select onChange={(e) => onChange(e)} name="branch" value={data.branch} aria-label="Default select example">
                        <option>select branch</option>
                        <option value="mechanical">mechanical</option>
                        <option value="it">it</option>
                        <option value="civil">civil</option>
                    </select>
                    {errors?.branch && <Form.Text className="text-danger">
                        {errors.branch}
                    </Form.Text>}

                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name="email" value={data.email} type="email" placeholder="Enter email" />
                        {errors?.email && <Form.Text className="text-danger">
                            {errors.email}
                        </Form.Text>}
                    </Form.Group>
                    <Form.Label>select gender</Form.Label>
                    <Row>
                        <Col>
                            <Form.Check onChange={(e) => onChange(e)}
                                name="gender" value="male"
                                type="radio"
                                label="Male"
                                id="formHorizontalRadios1"
                            />
                        </Col>
                        <Col>
                            <Form.Check onChange={(e) => onChange(e)}
                                name="gender" value="female"
                                type="radio"
                                label="Female"
                                id="formHorizontalRadios1"
                            />
                        </Col>
                    </Row>
                    {errors?.gender && <Form.Text className="text-danger">
                        {errors.gender}
                    </Form.Text>}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>select birthdate</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name="bdate" value={data.bdate} max="2004-01-01" type="date" placeholder="Enter birthdate" />
                        {errors?.bdate && <Form.Text className="text-danger">
                            {errors.bdate}
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check onChange={( e) => onChange(e)} name="registerd" value={data.registerd} type="checkbox" label="already registerd" />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={errors.studentname || errors.rollno || errors.email || errors.gender || errors.branch || errors.bdate !== "" ? true : false} onClick={(e) => HandleSubmit(e)}>
                        Submit
                    </Button>
                </Form>
            </div>
            <div className="mt-5">
                <Table
                    columns={entriesDashboardColumns}
                    dataSource={UserData?.getData || ""}
                    onChange={(e) => HandleChange(e)}
                />
            </div>
        </div>
    )
}
const mapStateToProps = (store) => {
    return {
        UserData: store.UserData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createUserData: (data) => dispatch(createAction(data)),
        getUserData: () => dispatch(GetAction()),
        editUserData: (data) => dispatch(EditAction(data)),
        deleteData: (data) => dispatch(DeleteAction(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEntry)
