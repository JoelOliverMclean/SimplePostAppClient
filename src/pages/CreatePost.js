import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { apiPost } from '../helpers/NetworkHelper'

function CreatePost() {

    const navigate = useNavigate()

    const initialValues = {
        title: "",
        postText: ""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required("Your post cannot be empty!"),
    })

    const onSubmit = (data) => {
        apiPost("/posts", data).then((response) => {
            navigate(`/`)
        })
    }

    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>Title: </label>
                    <ErrorMessage name='title' component="span" />
                    <Field id="inputCreatePost" name="title" placeholder="e.g. My First Post..." />
                    <label>Post: </label>
                    <ErrorMessage name='postText' component="span" />
                    <Field id="inputCreatePost" name="postText" placeholder="What's on your mind?" />
                    <button type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost