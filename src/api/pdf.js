import axios from 'axios'

const contentType = { 'Content-Type': 'multipart/form-data' }

const pdf = {
    upload: (file) => {
        const formData = new FormData()
        formData.append('file', file)
        return axios.post('/pdf', formData, contentType)
    },
    merge: (data) => {
        return axios.post('/pdf/merge', data)
    }
}

export default pdf;