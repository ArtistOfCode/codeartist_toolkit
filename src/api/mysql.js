import { Toast } from "@douyinfe/semi-ui";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8888';
axios.interceptors.response.use(resp => {
    if (resp.status !== 200) {
        Toast.error(resp.statusText);
        return Promise.reject(resp);
    }
    if (resp.data.status !== 0) {
        Toast.error(resp.data.msg);
        return Promise.reject(resp.data.msg);
    }
    return resp.data.data;
})

const mysql = {
    connection: (datasource) => axios.post('/client/mysql', datasource),
    end: () => axios.delete('/client/mysql'),
    query: (sql) => axios.post('/client/mysql/query', { sql }),
}

export default mysql;