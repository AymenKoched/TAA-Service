import "module-alias/register";
import "dotenv/config";
import http from "http";
import { getEnv, initializeDatabase } from "./utils";
import app from "./app";

function normalizePort(val) {
  const port = parseInt(val, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

const PORT = normalizePort(getEnv("PORT") || "80");
app.set("port", PORT);
const server = http.createServer(app);

initializeDatabase().then(callback => {
  if (callback === true) {
    server.listen(PORT, error => {
      if (error) console.error(error);
      // eslint-disable-next-line no-console
      console.info(`Server running at http://localhost:${PORT}`);
    });
  } else {
    // eslint-disable-next-line no-console
    console.info(callback);
  }
});
