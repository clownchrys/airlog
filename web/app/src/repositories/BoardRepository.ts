import { ScheduleEntity } from "src/models/ScheduleEntity";
import axios from "axios";
import { PostEntity, PostEntityCreate, PostEntityUpdate } from "src/models/PostEntity";
import { PostReplyEntity, PostReplyEntityCreate } from "src/models/PostReplyEntity";

const QUERY_URL = "/api/express/query/board";

export default class BoardRepository {
  public static getPostList(artistId: number): Promise<PostEntity[]> {
    return axios.request<PostEntity[]>({
      method: "GET",
      url: QUERY_URL + `/post/list/${ artistId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static getPostListRecent(artistId: number, limit: number): Promise<PostEntity[]> {
    return axios.request<PostEntity[]>({
      method: "GET",
      url: QUERY_URL + `/post/list/${ artistId }`,
      params: { limit },
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static searchPost(artistId: number, keyword: string): Promise<PostEntity[]> {
    return axios.request<PostEntity[]>({
      method: "GET",
      url: QUERY_URL + `/post/list/${ artistId }/search`,
      params: { keyword },
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static createPost(post: PostEntityCreate): Promise<PostEntity> {
    return axios.request<PostEntity>({
      method: "POST",
      url: QUERY_URL + `/post`,
      data: post,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static getPost(postId: number): Promise<PostEntity> {
    return axios.request<PostEntity>({
      method: "GET",
      url: QUERY_URL + `/post/${ postId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static updatePost(postId: number, post: PostEntityUpdate): Promise<PostEntity> {
    return axios.request<PostEntity>({
      method: "PUT",
      url: QUERY_URL + `/post/${ postId }`,
      data: post,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static deletePost(postId: number): Promise<PostEntity> {
    return axios.request<PostEntity>({
      method: "DELETE",
      url: QUERY_URL + `/post/${ postId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static viewPost(postId: number): Promise<boolean> {
    return axios.request<boolean>({
      method: "PATCH",
      url: QUERY_URL + `/post/${ postId }/view`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static likePost(postId: number, userEmail: string): Promise<boolean> {
    return axios.request<boolean>({
      method: "POST",
      url: QUERY_URL + `/post/${ postId }/like`,
      data: { userEmail },
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static unlikePost(postId: number, userEmail: string): Promise<boolean> {
    return axios.request<boolean>({
      method: "DELETE",
      url: QUERY_URL + `/post/${ postId }/like`,
      data: { userEmail },
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static createReply(reply: PostReplyEntityCreate): Promise<PostReplyEntity> {
    return axios.request<PostReplyEntity>({
      method: "POST",
      url: QUERY_URL + `/post/reply`,
      data: reply,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static deleteReply(replyId: number): Promise<boolean> {
    return axios.request<boolean>({
      method: "DELETE",
      url: QUERY_URL + `/post/reply/${ replyId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

}