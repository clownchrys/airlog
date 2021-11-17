import React from "react";
import useSWR from "swr";
import { Empty, List } from "antd";
import LinkFooter from "src/components/common/LinkFooter";
import TodayScheduleItem from "src/components/TodayScheduleComponent/TodayScheduleItem";
import CalendarRepository from "src/repositories/CalendarRepository";
import LoadingComponent from "src/components/LoadingComponent";
import { ScheduleEntity } from "src/models/ScheduleEntity";

type TodayScheduleComponentProps = {
  artistId: number,
}

export default function TodayScheduleComponent({ artistId }: TodayScheduleComponentProps) {
  const { data, isValidating } = useSWR<ScheduleEntity[]>(`ScheduleListToday-${ artistId }`, () => {
    return CalendarRepository.getScheduleListToday(artistId);
  }, { revalidateOnFocus: false });

  return <div style={{ margin: "20px 0" }}>
    <h2 style={ { margin: 20 } }>오늘의 일정</h2>

    { isValidating
      ? <LoadingComponent desc="스케쥴을 불러오는 중입니다" vSpace={ 100 }/>
      : <List
        dataSource={ data }
        renderItem={ TodayScheduleItem }
        locale={ { emptyText: <Empty description="오늘은 스케쥴이 없네요...ㅠ" style={ { color: "rgba(0, 0, 0, 0.5)" } }/> } }
        footer={ <LinkFooter href={ `/artist/${ artistId }/calendar` }/> }
        bordered
      />
    }
  </div>
}
