import app from './app.js';
import http from 'http';
import { initSocket } from './socket.js';
import { initDB } from "./dao/db/mongodb.js"

const PORT = 8080;

await initDB();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

initSocket(server);