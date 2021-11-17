import express, { Router } from "express";
import { Between, getConnection, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import ScheduleEntity from "src/lib/typeorm/entity/Schedule.entity";
import { ScheduleEntityCreate, ScheduleEntityUpdate } from "src/models/ScheduleEntity";
import ScheduleCalendarEntity from "src/lib/typeorm/entity/ScheduleCalendar.entity";
import { logger } from "src/lib/logging";
import ScheduleLikeEntity from "src/lib/typeorm/entity/ScheduleLike.entity";
import ScheduleReplyEntity from "src/lib/typeorm/entity/ScheduleReply.entity";
import { ScheduleReplyEntityCreate } from "src/models/ScheduleReplyEntity";

const router = Router();

type WithScheduleId = { scheduleId: string };
type WithArtistId = { artistId: string };
type WithReplyId = { replyId: string };
type WithCalendarId = { replyId: string };
type WithUserEmail = { userEmail: string };

router.get("/info/list", async (req, res) => {
  const repo = getConnection().getRepository(ScheduleCalendarEntity);

  try {
    const result = await repo.find();
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

router.get("/info/:calendarId", async (req: express.Request<WithCalendarId, ScheduleCalendarEntity | string>, res) => {
  const { params: { replyId } } = req;
  const repo = getConnection().getRepository(ScheduleCalendarEntity);

  try {
    const result = await repo.findOneOrFail(replyId);
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

router.get("/schedule/list/:artistId", async (req: express.Request<WithArtistId, ScheduleEntity[] | string>, res) => {
  const { params: { artistId } } = req;
  const repo = getConnection().getRepository(ScheduleEntity);

  try {
    const result = await repo.find({
      where: { artist: parseInt(artistId) },
      relations: [ "calendar", "writer", "artist" ],
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

router.get("/schedule/list/today/:artistId", async (req: express.Request<WithArtistId, ScheduleEntity[] | string>, res) => {
  const { params: { artistId } } = req;
  const repo = getConnection().getRepository(ScheduleEntity);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const todayStarts = new Date(year, month, date, 0, 0, 0, 0).toISOString();
  const todayEnds = new Date(year, month, date, 23, 59, 59, 999).toISOString();

  try {

    const result = await repo.find({
      where: {
        artist: parseInt(artistId),
        start: LessThanOrEqual(todayEnds),
        end: MoreThanOrEqual(todayStarts)
      },
      order: {
        start: "ASC"
      },
      relations: [ "calendar", "writer", "artist" ],
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

router.get("/schedule/:scheduleId", async (req: express.Request<WithScheduleId, ScheduleEntity | string>, res) => {
  const { params: { scheduleId } } = req;
  const repo = getConnection().getRepository(ScheduleEntity);

  try {
    const result = await repo.findOneOrFail(scheduleId, {
      relations: [ "calendar", "writer", "artist" ]
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

router.post("/schedule", async (req: express.Request<any, ScheduleEntity | string, ScheduleEntityCreate>, res) => {
  const { body: { title, start, end, isAllDay, state, location, calendarId: calendar, writerEmail: writer, artistId: artist } } = req;
  const repo = getConnection().getRepository(ScheduleEntity);

  try {
    const { identifiers: [ id ] } = await repo.insert({
      title, start, end, isAllDay, state, location, calendar, writer, artist
    });
    const result = await repo.findOneOrFail(id, {
      relations: [ "calendar", "writer", "artist" ]
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

router.put("/schedule/:scheduleId", async (req: express.Request<WithScheduleId, any, ScheduleEntityUpdate>, res) => {
  const { body: { title, start, end, isAllDay, state, location, calendarId: calendar, writerEmail: writer }, params: { scheduleId } } = req;
  const repo = getConnection().getRepository(ScheduleEntity);

  try {
    await repo.update({ id: parseInt(scheduleId) }, {
      title, start, end, isAllDay, state, location, calendar, writer
    });
    const result = await repo.findOneOrFail(scheduleId, {
      relations: [ "calendar", "writer", "artist" ]
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

router.delete("/schedule/:scheduleId", async (req: express.Request<WithScheduleId>, res) => {
  const { params: { scheduleId } } = req;
  const repo = getConnection().getRepository(ScheduleEntity);

  try {
    const { affected } = await repo.delete({
      id: parseInt(scheduleId)
    });
    res.status(200).json(!!affected);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 단일 스케쥴 엔티티에 대한 댓글 리스트 Read
router.get("/schedule/:scheduleId/reply/list", async (req: express.Request<WithScheduleId, ScheduleReplyEntity[] | string>, res) => {
  const { params: { scheduleId } } = req;
  const repo = getConnection().getRepository(ScheduleReplyEntity);

  try {
    const result = await repo.find({
      where: { schedule: scheduleId },
      order: { id: "DESC" },
      relations: [ "schedule", "writer" ]
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 단일 스케쥴 엔티티에 댓글 Create
router.post("/schedule/reply", async (req: express.Request<any, ScheduleReplyEntity | string, ScheduleReplyEntityCreate>, res) => {
  const { body: { writerEmail, content, scheduleId } } = req;
  const repo = getConnection().getRepository(ScheduleReplyEntity);

  try {
    const { identifiers: [ id ] } = await repo.insert({
      writer: writerEmail,
      content: content,
      schedule: scheduleId
    });
    const result = await repo.findOneOrFail(id);
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 댓글 Delete
router.delete("/schedule/reply/:replyId", async (req: express.Request<WithReplyId, boolean | string>, res) => {
  const { params: { replyId } } = req;
  const repo = getConnection().getRepository(ScheduleReplyEntity);

  try {
    const { affected } = await repo.delete({
      id: parseInt(replyId)
    });
    res.status(200).json(!!affected);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 해당 유저가 스케쥴을 Like 했는지 아닌지
router.get("/schedule/:scheduleId/isLike", async (req: express.Request<WithScheduleId, boolean | string, any, WithUserEmail>, res) => {
  const { params: { scheduleId }, query: { userEmail } } = req;
  const repo = getConnection().getRepository(ScheduleLikeEntity);

  try {
    const result = await repo.findOne({
      where: { user: userEmail, schedule: scheduleId }
    });
    res.status(200).json(!!result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 해당 스케쥴의 Like 수
router.get("/schedule/:scheduleId/like/count", async (req: express.Request<WithScheduleId, number | string>, res) => {
  const { params: { scheduleId } } = req;
  const repo = getConnection().getRepository(ScheduleLikeEntity);

  try {
    const result = await repo.count({
      where: { schedule: scheduleId }
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 해당 스케쥴 Like 하기
router.post("/schedule/:scheduleId/like", async (req: express.Request<WithScheduleId, boolean | string, { userEmail: string }>, res) => {
  const { params: { scheduleId }, body: { userEmail } } = req;
  const repo = getConnection().getRepository(ScheduleLikeEntity);

  try {
    const { identifiers: [ id ] } = await repo.insert({
      user: userEmail,
      schedule: parseInt(scheduleId)
    })
    res.status(200).json(!!id);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 해당 스케쥴 Unlike
router.delete("/schedule/:scheduleId/like", async (req: express.Request<WithScheduleId, boolean | string, { userEmail: string }>, res) => {
  const { params: { scheduleId }, body: { userEmail } } = req;
  const repo = getConnection().getRepository(ScheduleLikeEntity);

  try {
    const { affected } = await repo.delete({
      user: userEmail,
      schedule: parseInt(scheduleId)
    })
    res.status(200).json(!!affected);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

export default router;
