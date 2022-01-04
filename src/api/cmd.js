import axios from 'axios'
import sse from './sse'

const cmd = {
    exec: (cmd) => axios.get('/cmd', { params: { cmd } }),
    execStream: (cmd) => {
        return new Promise((resolve, reject) => {
            if (!cmd) {
                reject(cmd);
            }
            sse('/cmd/stream?cmd=' + cmd, resolve)
        })
    },
}

export default cmd;