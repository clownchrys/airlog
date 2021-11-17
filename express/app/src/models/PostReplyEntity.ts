import PostReplyEntity from "src/lib/typeorm/entity/PostReply.entity";

export type PostReplyEntityCreate = Pick<PostReplyEntity, "content"> & {
  postId: number
  writerEmail: string
}
