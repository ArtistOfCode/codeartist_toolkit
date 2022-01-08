import { Toast } from "@douyinfe/semi-ui";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8888';
axios.interceptors.response.use(resp => {
    if (resp.status === 200) {
        return resp.data;
    }
    return Promise.reject(resp.data);
}, error => {
    const { status, data } = error.response;
    if (status === 400) {
        console.warn(data);
        Toast.warning(data.error);
    } else if (status === 500) {
        console.error(data);
        Toast.error(data.error);
    }
    return Promise.reject(data);
})

const mysql = {
    connection: (datasource) => axios.post('/client/mysql', datasource),
    end: () => axios.delete('/client/mysql'),
    query: (sql) => axios.post('/client/mysql/query', { sql }),
}

export default mysql;