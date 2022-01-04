import axios from 'axios'
import sse from './sse'

const cmd = {
    exec: (cmd) => axios.get('/cmd', { params: { cmd } }),
    execStream: (cmd, cb) => {
        if (!cmd) {
            return;
        }
        sse('/cmd/stream?cmd=' + cmd, cb)
    },
}

export default cmd;