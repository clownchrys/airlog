import express, { Router } from "express";
import { getConnection, Like } from "typeorm";
import { logger } from "src/lib/logging";
import ArtistEntity from "src/lib/typeorm/entity/Artist.entity";
import ArtistFollowerEntity from "src/lib/typeorm/entity/ArtistFollower.entity";

const router = Router();

type WithArtistId = { artistId: string };
type WithKeyword = { keyword: string };

// 모든 아티스트 리스트 Read
router.get("/list", async (req: express.Request<null, ArtistEntity[] | string, null>, res) => {
  const repo = getConnection().getRepository(ArtistEntity);

  try {
    const result = await repo.find({
      relations: [ "followerList", "followerList.user" ]
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 아티스트 검색하기 Read
router.get("/list/search", async (req: express.Request<null, ArtistEntity[] | string, null, WithKeyword>, res) => {
  const { query: { keyword } } = req;
  const repo = getConnection().getRepository(ArtistEntity);

  try {
    const result = await repo.find({
      where: {
        name: Like(`%${ keyword }%`)
      },
      relations: [ "followerList", "followerList.user" ]
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 개별 아티스트 Read
router.get("/info/:artistId", async (req: express.Request<WithArtistId, ArtistEntity | string, null>, res) => {
  const { params: { artistId } } = req;
  const repo = getConnection().getRepository(ArtistEntity);

  try {
    const result = await repo.findOneOrFail({
      where: { id: artistId },
      relations: [ "followerList", "followerList.user" ]
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 개별 아티스트 Follow
router.post("/follow/:artistId", async (req: express.Request<WithArtistId, boolean | string, { userEmail: string }>, res) => {
  const { params: { artistId }, body: { userEmail } } = req;
  const repo = getConnection().getRepository(ArtistFollowerEntity);

  try {
    await repo.insert({
      artist: parseInt(artistId),
      user: userEmail
    });
    res.status(200).json(true);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 개별 아티스트 Unfollow
router.delete("/follow/:artistId", async (req: express.Request<WithArtistId, boolean | string, { userEmail: string }>, res) => {
  const { params: { artistId }, body: { userEmail } } = req;
  const repo = getConnection().getRepository(ArtistFollowerEntity);

  try {
    await repo.delete({
      artist: parseInt(artistId),
      user: userEmail
    });
    res.status(200).json(true);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

export default router;