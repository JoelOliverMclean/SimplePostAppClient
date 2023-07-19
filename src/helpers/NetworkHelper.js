import axios from 'axios'

const apiGet = (action) => {
  return axios.get(action, {
    validateStatus: (status) => {
      return true
    }
  })
} 

const apiDelete = (action) => {
  return axios.delete(action, {
    validateStatus: (status) => {
      return true
    }
  })
} 

const apiPost = (action, body) => {
  return axios.post(action, body, {
    validateStatus: (status) => {
      return true
    }
  })
}

const getCsrfToken = async () => {
  const { data } = await apiGet("/csrf-token")
  axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken
}

export {apiGet, apiPost, getCsrfToken, apiDelete}