export interface IServerCreate {
  _id: number,
  createdAt: Date,
  modifiedAt: Date,
}

export interface IArticleCreate {
  artistId: number,
  kind: "info" | "market",
  writer: string,
  title: string,
  content: string
}
export interface IArticle extends IServerCreate, IArticleCreate {
  upVote: number,
  downVote: number,
  viewCount: number,
  replies?: IReply[]
}

export interface IReplyCreate {
  writer: string,
  content: string,
}
export interface IReply extends IServerCreate, IReplyCreate {
  isDeleted: boolean
}