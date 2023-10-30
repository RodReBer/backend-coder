import app from './app.js';
import { initSocket } from './socket.js';
import { initDB } from "./dao/db/mongodb.js"

const PORT = 8080;

await initDB();

const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT} ...`);
});

initSocket(httpServer);