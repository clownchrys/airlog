import axios from "axios";

const QUERY_URL = "/api/express/upload";

export default class UploadRepository {
  public static uploadImage(): Promise<{ link: string }> {
    return axios.request<{ link: string }>({
      method: "POST",
      url: QUERY_URL + `/image`,
      withCredentials: true
    }).then(({ data }) => data);
  }
}