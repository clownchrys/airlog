import UserEntity from "src/lib/typeorm/entity/User.entity";
import ArtistEntity from "src/lib/typeorm/entity/Artist.entity";
import PostReplyEntity from "src/lib/typeorm/entity/PostReply.entity";

export interface PostEntity {
  id: number
  title: string
  content: string
  writer: UserEntity
  artist: ArtistEntity
  replyList: PostReplyEntity[]
  createdAt: string
  updatedAt: string
}

export type PostEntityCreate = Omit<PostEntity, "id" | "createdAt" | "updatedAt" | "writer" | "artist" | "replyList" | "likeList" | "viewCount"> & {
  writerEmail: string
  artistId: number
}

export type PostEntityUpdate = Pick<PostEntity, "title" | "content">
