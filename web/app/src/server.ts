// development mode with HTTP(3080), HTTPS(3443)

import https from "https";
import http from "http";
import fs from "fs";
import { parse } from "url";
import Next from "next";

const HTTP_PORT = 3080;
const HTTPS_PORT = 3443;
const dev = process.env.NODE_ENV !== "production";

const app = Next({ dev });
const handler = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./localhost.key"),
  cert: fs.readFileSync("./localhost.crt"),
}

app.prepare().then(() => {
  http.createServer(( req, res ) => {
    const parsedUrl = parse(req.url ?? "", true);
    handler(req, res, parsedUrl);
  }).listen(HTTP_PORT,  () => {
    console.log(`HTTP: Ready on http://localhost:${ HTTP_PORT }`);
  });

  https.createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url ?? "", true);
    handler(req, res, parsedUrl);
  }).listen(HTTPS_PORT, () => {
    console.log(`HTTPS: Ready on https://localhost:${ HTTPS_PORT }`);
  });
})