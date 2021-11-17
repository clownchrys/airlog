import cors from "cors";
import express from "express";
import morgan from "morgan";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";
// import { isArray } from "util";
// import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginCacheControl
} from "apollo-server-core";
import { InMemoryLRUCache } from "apollo-server-caching";
import { ApolloServer } from "apollo-server-express";
// import { typeDefs, resolvers } from "./graphql";

import { logger, stream } from "src/lib/logging";
import ormconfig from "src/lib/typeorm/ormconfig";
import UploadRouter from "src/routers/upload";
import QueryRouter from "src/routers/query";
import TestRouter from "src/routers/test";

// @ts-ignore
const PORT = process.env.PORT as number ?? 3000;
const INTERNAL_URI = `http://localhost:${PORT}`;
const EXTERNAL_URI = "http://localhost:1000/express";

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true })); // body-parser
app.use(express.json()); // json-parser
app.use(morgan(
    "HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms",
    { stream }
));
app.use(cors((req, callback: Function) => {
    const error = null;
    const options = {
        origin: [
            /^(http:\/\/|https:\/\/)localhost:3000/, // "http://localhost:3000"
            /^(http:\/\/|https:\/\/)web/, // "http://web"
        ],
        // origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "",
        exposedHeaders: "",
        preflightContinue: true,
        credentials: true,
        maxAge: 60
    }
    callback(error, options); // callback expects two parameters: error and options
}));

// GraphQL
// const isProduction = false;
// const pluginLandingPage = isProduction ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageLocalDefault();
// const pluginCacheControl = ApolloServerPluginCacheControl({
//     defaultMaxAge: 5,
//     calculateHttpHeaders: false
// });
// const apollo = new ApolloServer({
//     // typeDefs, resolvers,
//     introspection: !isProduction,
//     plugins: [ pluginLandingPage, pluginCacheControl ],
//     cache: new InMemoryLRUCache({ maxSize: 500 * 1024 ** 2 })
// });
// apollo.applyMiddleware({ app, path: "/graphql" });

// Routes
app.use("/upload", UploadRouter);
app.use("/query", QueryRouter);
app.use("/test", TestRouter);

// Connecting TypeORM & Listening Server
createConnection(ormconfig)
  .then(() => console.log("DB Connected!"))
  .then(() => app.listen(PORT, () => logger.info(`Listening on ${ EXTERNAL_URI }`)));

// Test API
app.get("/", (req, res) =>
  res.status(200).json({
      "status": "OK",
      "message": "Express service currently running on",
  }))

// const STORAGE_ROUTE = "/upload/image";
// const STORAGE_PATH = path.join(__dirname, STORAGE_ROUTE);
// if (!fs.existsSync(STORAGE_PATH)) {
//     fs.mkdirSync(STORAGE_PATH, { recursive: true })
// }

// // upload image api
// app.use(STORAGE_ROUTE, express.static(STORAGE_PATH))
// app.post(STORAGE_ROUTE, async (req, res) => {
//     const form = new formidable.IncomingForm({
//         uploadDir: STORAGE_PATH,
//         keepExtensions: true,
//         allowEmptyFiles: false,
//     });
//     const parseCallback = (err: any, fields: formidable.Fields, files: formidable.Files) => {
//         const { proxyRoot, targetParameter } = fields;
//         console.log({ name: "post", headers: req.headers, path: req.path, files, fields })

//         if (!targetParameter || isArray(targetParameter)) {
//             return res.status(400).send("targetParameter not specified")
//         }

//         const fileData = files[targetParameter];
//         const file = (fileData && isArray(fileData) ? fileData[0] : fileData);
//         if (!file) {
//             return res.status(400).send("no file included")
//         }

//         const link = proxyRoot + path.join(STORAGE_ROUTE, path.basename(file.path));
//         res.status(200).json({ link });
//     };

//     try {
//         await form.parse(req, parseCallback);
//     } catch(error) {
//         logger.error(error)
//         res.status(500).send("unhandled error occured on server")
//     }
// })
// app.delete(`${STORAGE_ROUTE}/:fileName`, async (req, res) => {
//     const { fileName } = req.params;
//     const targetPath = path.join(STORAGE_PATH, fileName)
//     // console.log({ name: "delete", headers: req.headers })

//     if (!fileName) {
//         res.status(400).send("file not specified")
//     }
//     try {
//         fs.unlinkSync(targetPath)
//         res.status(200).json({ message: "OK" })
//     } catch (error) {
//         logger.error(error)
//         res.status(500).send("cannot remove file on server now")
//     };
// })