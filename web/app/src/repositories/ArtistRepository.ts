import axios from "axios";
import { ArtistEntity } from "src/models/ArtistEntity";

const QUERY_URL = "/api/express/query/artist";

export default class ArtistRepository {
  public static getArtistList(): Promise<ArtistEntity[]> {
    return axios.request<ArtistEntity[]>({
      method: "GET",
      url: QUERY_URL + `/list`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static searchArtistList(keyword: string): Promise<ArtistEntity[]> {
    return axios.request<ArtistEntity[]>({
      method: "GET",
      url: QUERY_URL + `/list/search`,
      params: { keyword },
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static getArtist(artistId: number): Promise<ArtistEntity> {
    return axios.request<ArtistEntity>({
      method: "GET",
      url: QUERY_URL + `/info/${ artistId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static followArtist(artistId: number, userEmail: string): Promise<boolean> {
    return axios.request<boolean>({
      method: "POST",
      url: QUERY_URL + `/follow/${ artistId }`,
      data: { userEmail },
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static unfollowArtist(artistId: number, userEmail: string): Promise<boolean> {
    return axios.request<boolean>({
      method: "DELETE",
      url: QUERY_URL + `/follow/${ artistId }`,
      data: { userEmail },
      withCredentials: true
    }).then(({ data }) => data);
  }
}