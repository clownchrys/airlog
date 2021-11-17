import { MILLI_SECONDS } from "./units";

export function toMultiMap<E = any>(src: E[], keyParser: (value: E) => string) {
  const result: { [key: string]: E[] } = {};
  src.forEach((value: E) => {
    const key = keyParser(value);
    if (!Object.keys(result).includes(key)) {
      result[key] = [];
    }
    result[key].push(value);
  })
  return result
}

export function toDisplayDate(dt: Date | string, dateOnly: boolean = false): string {
  const delta = new Date().getTime() - new Date(dt).getTime();

  if (delta > MILLI_SECONDS.DAY) {
    if (dateOnly) {
      return new Date(dt).toLocaleDateString("ko", { dateStyle: "medium" });
    } else {
      return new Date(dt).toLocaleString("ko", { hour12: false, dateStyle: "long", timeStyle: "short" });
    }
  } else if (delta > MILLI_SECONDS.HOUR) {
    return `${ Math.round(delta / MILLI_SECONDS.HOUR) }시간 전`;
  } else if (delta > MILLI_SECONDS.MINUTE) {
    return `${ Math.round(delta / MILLI_SECONDS.MINUTE) }분 전`;
  } else if (delta > MILLI_SECONDS.SECOND) {
    return `${ Math.round(delta / MILLI_SECONDS.SECOND) }초 전`
  } else if (delta) {
    return "방금";
  } else {
    return "알 수 없음";
  }
}

// TODO: build criterion to distinguish content status
export const getStatusFromLike = (like: number) => like > 1000 ? "hot" : (like > 100 ? "normal" : "cold");
