import axios from "axios";
import { ScheduleEntity, ScheduleEntityCreate, ScheduleEntityUpdate } from "src/models/ScheduleEntity";
import { ScheduleCalendarEntity } from "src/models/ScheduleCalendarEntity";
import { ScheduleReplyEntity, ScheduleReplyEntityCreate } from "src/models/ScheduleReplyEntity";

const QUERY_URL = "/api/express/query/calendar";

export default class CalendarRepository {
  public static getCalendar(calendarId: number): Promise<ScheduleCalendarEntity> {
    return axios.request<ScheduleCalendarEntity>({
      method: "GET",
      url: QUERY_URL + `/info/${ calendarId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static getCalendarList(): Promise<ScheduleCalendarEntity[]> {
    return axios.request<ScheduleCalendarEntity[]>({
      method: "GET",
      url: QUERY_URL + "/info/list",
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static getScheduleList(artistId: number): Promise<ScheduleEntity[]> {
    return axios.request<ScheduleEntity[]>({
      method: "GET",
      url: QUERY_URL + `/schedule/list/${ artistId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static getScheduleListToday(artistId: number): Promise<ScheduleEntity[]> {
    return axios.request<ScheduleEntity[]>({
      method: "GET",
      url: QUERY_URL + `/schedule/list/today/${ artistId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static getSchedule(scheduleId: number): Promise<ScheduleEntity> {
    return axios.request<ScheduleEntity>({
      method: "GET",
      url: QUERY_URL + `/schedule/${ scheduleId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static createSchedule(schedule: ScheduleEntityCreate): Promise<ScheduleEntity> {
    return axios.request<ScheduleEntity>({
      method: "POST",
      url: QUERY_URL + "/schedule",
      data: schedule,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static updateSchedule(scheduleId: number, schedule: ScheduleEntityUpdate): Promise<ScheduleEntity> {
    return axios.request<ScheduleEntity>({
      method: "PUT",
      url: QUERY_URL + `/schedule/${ scheduleId }`,
      data: schedule,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static deleteSchedule(scheduleId: number): Promise<boolean> {
    return axios.request<boolean>({
      method: "DELETE",
      url: QUERY_URL + `/schedule/${ scheduleId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static getReplyList(scheduleId: number): Promise<ScheduleReplyEntity[]> {
    return axios.request<ScheduleReplyEntity[]>({
      method: "GET",
      url: QUERY_URL + `/schedule/${ scheduleId }/reply/list`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static createReply(reply: ScheduleReplyEntityCreate): Promise<ScheduleReplyEntity> {
    return axios.request<ScheduleReplyEntity>({
      method: "POST",
      url: QUERY_URL + `/schedule/reply`,
      data: reply,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static deleteReply(replyId: number): Promise<boolean> {
    return axios.request<boolean>({
      method: "DELETE",
      url: QUERY_URL + `/schedule/reply/${ replyId }`,
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static createScheduleLike(scheduleId: number, userEmail: string): Promise<boolean> {
    return axios.request<boolean>({
      method: "POST",
      url: QUERY_URL + `/schedule/${ scheduleId }/like`,
      data: { userEmail },
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static deleteScheduleLike(scheduleId: number, userEmail: string): Promise<boolean> {
    return axios.request<boolean>({
      method: "DELETE",
      url: QUERY_URL + `/schedule/${ scheduleId }/like`,
      data: { userEmail },
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static isScheduleLike(scheduleId: number, userEmail: string): Promise<boolean> {
    return axios.request<boolean>({
      method: "GET",
      url: QUERY_URL + `/schedule/${ scheduleId }/isLike`,
      params: { userEmail },
      withCredentials: true
    }).then(({ data }) => data);
  }

  public static countScheduleLike(scheduleId: number): Promise<number> {
    return axios.request<number>({
      method: "GET",
      url: QUERY_URL + `/schedule/${ scheduleId }/like/count`,
      withCredentials: true
    }).then(({ data }) => data);
  }
}