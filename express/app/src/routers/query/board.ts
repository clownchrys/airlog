import express, { Router } from "express";
import { getConnection, Like } from "typeorm";
import { logger } from "src/lib/logging";
import PostEntity from "src/lib/typeorm/entity/Post.entity";
import { PostEntityCreate, PostEntityUpdate } from "src/models/PostEntity";
import PostLikeEntity from "src/lib/typeorm/entity/PostLike.entity";
import PostReplyEntity from "src/lib/typeorm/entity/PostReply.entity";
import { PostReplyEntityCreate } from "src/models/PostReplyEntity";

const router = Router();

type WithArtistId = { artistId: string };
type WithPostId = { postId: string };
type WithReplyId = { replyId: string };
type WithKeyword = { keyword: string };
type WithLimit = { limit: string };

// 개별 아티스트에 대한 포스트 리스트 Read
router.get("/post/list/:artistId", async (req: express.Request<WithArtistId, PostEntity[] | string, null, WithLimit>, res) => {
  const { params: { artistId }, query: { limit } } = req;
  const repo = getConnection().getRepository(PostEntity);

  try {
    const result = await repo.find({
      where: { artist: artistId },
      order: { id: "DESC" },
      take: limit ? parseInt(limit) : undefined,
      relations: [ "writer", "artist", "replyList", "replyList.writer", "likeList", "likeList.user" ]
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 게시글 검색하기 Read
router.get("/post/list/:artistId/search", async (req: express.Request<WithArtistId, PostEntity[] | string, null, WithKeyword>, res) => {
  const { params: { artistId }, query: { keyword } } = req;
  const repo = getConnection().getRepository(PostEntity);

  try {
    const result = await repo.find({
      where: {
        artist: artistId,
        title: Like(`%${ keyword }%`)
      },
      order: { id: "DESC" },
      relations: [ "writer", "artist", "replyList", "replyList.writer", "likeList", "likeList.user" ]
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 새 포스트 Create
router.post("/post", async (req: express.Request<WithPostId, PostEntity | string, PostEntityCreate>, res) => {
  const { body: { title, content, artistId, writerEmail } } = req;
  const repo = getConnection().getRepository(PostEntity);

  try {
    const { identifiers: [ id ] } = await repo.insert({
      title: title,
      content: content,
      artist: artistId,
      writer: writerEmail
    })
    const result = await repo.findOneOrFail(id);
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 포스트 Read
router.get("/post/:postId", async (req: express.Request<WithPostId, PostEntity | string>, res) => {
  const { params: { postId } } = req;
  const repo = getConnection().getRepository(PostEntity);

  try {
    const result = await repo.findOneOrFail(postId, {
      relations: [ "writer", "artist", "replyList", "replyList.writer", "likeList", "likeList.user" ]
    });
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 포스트 Update
router.put("/post/:postId", async (req: express.Request<WithPostId, PostEntity | string, PostEntityUpdate>, res) => {
  const { params: { postId }, body: { title, content } } = req;
  const repo = getConnection().getRepository(PostEntity);

  try {
    await repo.update({ id: parseInt(postId) }, {
      title: title,
      content: content,
    })
    const result = await repo.findOneOrFail(postId);
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 포스트 Delete
router.delete("/post/:postId", async (req: express.Request<WithPostId, boolean | string>, res) => {
  const { params: { postId } } = req;
  const repo = getConnection().getRepository(PostEntity);

  try {
    const { affected } = await repo.delete({ id: parseInt(postId) });
    res.status(200).json(!!affected);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 포스트에 대한 Page View
router.patch("/post/:postId/view", async (req: express.Request<WithPostId, boolean | string>, res) => {
  const { params: { postId } } = req;
  const repo = getConnection().getRepository(PostEntity);

  try {
    const { affected } = await repo.increment(
      { id: parseInt(postId) },
      "viewCount",
      1
    );
    // const { affected } = await repo.createQueryBuilder('posts')
    //   .update(PostEntity)
    //   .whereInIds([ postId ])
    //   .set({ viewCount: () => "view_count + 1" })
    //   .execute();
    res.status(200).json(!!affected);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 포스트 Like
router.post("/post/:postId/like", async (req: express.Request<WithPostId, boolean | string, { userEmail: string }>, res) => {
  const { params: { postId }, body: { userEmail } } = req;
  const repo = getConnection().getRepository(PostLikeEntity);

  try {
    const { identifiers: [ id ] } = await repo.insert({
      post: parseInt(postId),
      user: userEmail
    })
    res.status(200).json(!!id);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 포스트 Unlike
router.delete("/post/:postId/like", async (req: express.Request<WithPostId, boolean | string, { userEmail: string }>, res) => {
  const { params: { postId }, body: { userEmail } } = req;
  const repo = getConnection().getRepository(PostLikeEntity);

  try {
    const { affected } = await repo.delete({
      post: parseInt(postId),
      user: userEmail
    })
    res.status(200).json(!!affected);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 포스트에 댓글 Create
router.post("/post/reply", async (req: express.Request<null, PostReplyEntity | string, PostReplyEntityCreate>, res) => {
  const { body: { postId, writerEmail, content } } = req;
  const repo = getConnection().getRepository(PostReplyEntity);

  try {
    const { identifiers: [ id ] } = await repo.insert({
      content: content,
      post: postId,
      writer: writerEmail
    })
    const result = await repo.findOneOrFail(id);
    res.status(200).json(result);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

// 포스트에 댓글 Delete
router.delete("/post/reply/:replyId", async (req: express.Request<WithReplyId, boolean | string, null>, res) => {
  const { params: { replyId } } = req;
  const repo = getConnection().getRepository(PostReplyEntity);

  try {
    const { affected } = await repo.delete({
      id: parseInt(replyId)
    })
    res.status(200).json(!!affected);
  } catch (e) {
    logger.error(e);
    res.status(400).send(`Internal Server Error\n${ e }`);
  }
})

export default router;