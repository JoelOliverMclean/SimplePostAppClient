import React, { useContext } from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import { apiPost } from '../helpers/NetworkHelper'

function Login() {

  const {setLoggedIn} = useContext(AuthContext)

  const navigate = useNavigate()

  const initialValues = {
    username: "",
    password: ""
  }

  const onSubmit = (data) => {
    apiPost("/auth/login", {
      username: data.username.trim(),
      password: data.password.trim()
    }).then((response) => {
        if (response.status !== 200)
          alert(response.data.error)
        else
          sessionStorage.setItem("accessToken", response.data)
          setLoggedIn("true")
          navigate("/")
    })
  }

  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className='loginContainer'>
                <label>Username: </label>
                <ErrorMessage name='username' component="span" />
                <Field id="inputCreatePost" name="username" placeholder="Choose your username..." />
                <label>Password: </label>
                <ErrorMessage name='password' component="span" />
                <Field type="password" id="inputCreatePost" name="password" placeholder="Create a password..." />
                <button type='submit'>Login</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Login