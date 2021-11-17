import { Router } from "express";
import CalendarRouter from "./calendar";
import BoardRouter from "./board";
import ArtistRouter from "./artist";

const router = Router();

router.use("/calendar", CalendarRouter);
router.use("/board", BoardRouter);
router.use("/artist", ArtistRouter);

export default router;