import { logger } from "src/lib/logging";
import express, { Router } from "express";
import path from "path";
import fs from "fs";
import formidable from "formidable";
import { isArray } from "util";

const STORAGE_ROOT = "src/assets";
const IMAGE_ROUTE = "/image";
const IMAGE_PATH = path.join(STORAGE_ROOT, IMAGE_ROUTE);
    if (!fs.existsSync(IMAGE_PATH)) {
    fs.mkdirSync(IMAGE_PATH, { recursive: true })
}

const router = Router();

// read
router.use(IMAGE_ROUTE, express.static(IMAGE_PATH))

// create
router.post(IMAGE_ROUTE, async (req, res) => {
    const form = new formidable.IncomingForm({
        uploadDir: IMAGE_PATH,
        keepExtensions: true,
        allowEmptyFiles: false,
    });
    const parseCallback = (err: any, fields: formidable.Fields, files: formidable.Files) => {
        const { proxyRoot, targetParameter } = fields;
        console.log({ name: "post", headers: req.headers, path: req.path, files, fields })

        if (!targetParameter || isArray(targetParameter)) {
            return res.status(400).send("targetParameter not specified")
        }

        const fileData = files[targetParameter];
        const file = (fileData && isArray(fileData) ? fileData[0] : fileData);
        if (!file) {
            return res.status(400).send("no file included")
        }

        const link = proxyRoot + path.join(IMAGE_ROUTE, path.basename(file.path));
        res.status(200).json({ link });
    };

    try {
        await form.parse(req, parseCallback);
    } catch(error) {
        logger.error(error)
        res.status(500).send("unhandled error occured on server")
    }
})

// delete
router.delete(`${IMAGE_ROUTE}/:fileName`, async (req, res) => {
    const { fileName } = req.params;
    const targetPath = path.join(IMAGE_PATH, fileName)
    // console.log({ name: "delete", headers: req.headers })

    if (!fileName) {
        res.status(400).send("file not specified")
    }
    try {
        fs.unlinkSync(targetPath)
        res.status(200).json({ message: "OK" })
    } catch (error) {
        logger.error(error)
        res.status(500).send("cannot remove file on server now")
    };
})

export default router;