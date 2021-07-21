import React, { useEffect, useState } from "react"
import { Button, Form, FormGroup } from 'react-bootstrap';
import './loginPage.css';
import { useMutation, gql } from "@apollo/client";
import ErrorMessage from "../common/ErrorMessage";
import jwt_decode from 'jwt-decode';
import { AdminInfo, StudentInfo, TeacherInfo, UserType } from "../../interface/models";
import { useHistory } from 'react-router';

const LOGIN = gql`
  mutation ($email: String!, $password: String!){
    login(
      email: $email,
      password: $password,
    )
  }
`;

 const LoginPage = () => {
    const [loginInfo, setLoginInfo] = useState({ email:"", password:""})
    const [login, { data, loading, error }] = useMutation(LOGIN);
    const history = useHistory()

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = event.target.value
        setLoginInfo({...loginInfo, [key]: newValue})
    }

    const handleLogin = async() => {
        try{
            await login({ variables: { email: loginInfo.email, password: loginInfo.password }})
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (data && !error){
            localStorage.setItem('profile', data.login)
            const userObj: AdminInfo | StudentInfo | TeacherInfo = jwt_decode(data.login)
            if(userObj.userType === UserType.ADMIN){
                history.push('/admin')
            } 
            if (userObj.userType === UserType.STUDENT){
                history.push('/student')
            } 
            if (userObj.userType === UserType.TEACHER){
                history.push('/teacher/classes')
            }
        }
    }, [data, error])

    console.log("data", data)
    console.log("error", error)

    return(
        <div>
            <Form className="login-form mt-5">
                <h1 className="text-center"> Class Record System </h1>
                {
                    loading ?
                    <h2> Loading... </h2> :
                    <div>
                        <FormGroup>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={loginInfo.email}
                                onChange={handleOnChange("email")}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Password </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={loginInfo.password}
                                onChange={handleOnChange("password")}
                            />
                        </FormGroup>
                    </div>
                }

                <ErrorMessage errorMessage={error}/>
                <Button className="btn-lg btn-dark btn-block" onClick={handleLogin}>
                    Log in
                </Button>
            </Form>
        </div>
    )
 }

 export default LoginPage