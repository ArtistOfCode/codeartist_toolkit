import axios from "axios";

const sse = (path, cb) => {
    const es = new EventSource(axios.defaults.baseURL + path)
    es.onmessage = e => cb(e.data)
    es.onerror = () => es.close()
    es.addEventListener('close', () => es.close(), false)
}

export default sse;