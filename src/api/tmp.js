import axios from 'axios'

const tmp = {
    get: (file) => axios.defaults.baseURL + '/file/' + file,
    delete: (files) => {
        return axios.delete('/file', { data: { files } })
    }
}

export default tmp;