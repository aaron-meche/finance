// server.js - root of your project
import { handler } from './build/handler.js';  // ← this is what adapter-node / adapter-auto generates

// Cloud Run requires 0.0.0.0 and process.env.PORT
const port = process.env.PORT || 8080;
const host = '0.0.0.0';

console.log(`Starting SvelteKit server on ${host}:${port}`);

handler.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});