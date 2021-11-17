import express, { Router } from "express";

const router = Router();

function test(req: express.Request, res: express.Response) {
  const { body, query, params } = req;
  console.log({ body, query, params });
  res.status(200).json({ result: "ok" });
}

router.get("/", test);
router.post("/", test);
router.put("/", test);
router.delete("/", test);

export default router;
