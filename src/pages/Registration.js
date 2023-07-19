import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { apiPost } from '../helpers/NetworkHelper'

function Registration() {

  const navigate = useNavigate()

  const initialValues = {
    username: "",
    password: ""
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "Username too short (min 3)").max(15, "Username too long (max 15)").test(
      {
        name: "contains-whitespace",
        skipAbsent: true,
        test(value, ctx) {
          if (value.trim().includes(" ")) {
            return ctx.createError({ message: "Username cannot contain spaces"})
          }
          return true
        }
      }
    ).required(),
    password: Yup.string().min(4, "Password too short (min 3)").max(20, "Password too long (max 15)").required(),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const onSubmit = (data) => {
    apiPost("/auth", {
      username: data.username.trim(),
      password: data.password.trim()
    }).then((response) => {
        if (response.status === 200)
          navigate("/")
    })
  }

  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='loginContainer'>
                <label>Username: </label>
                <ErrorMessage name='username' component="span" />
                <Field id="inputCreatePost" name="username" placeholder="Choose your username..." />
                <label>Password: </label>
                <ErrorMessage name='password' component="span" />
                <Field type="password" id="inputCreatePost" name="password" placeholder="Create a password..." />
                <label>Confirm Password: </label>
                <ErrorMessage name='passwordConfirmation' component="span" />
                <Field type="password" id="inputCreatePost" name="passwordConfirmation" placeholder="Repeat password..." />
                <button type='submit'>Register</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration