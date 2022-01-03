const websocket = {
    ws: null,
    connection: (host) => {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(host);
            ws.onopen = () => {
                websocket.ws = ws;
                resolve()
            };
            ws.onerror = () => reject();
        })
    }
}

export default websocket;