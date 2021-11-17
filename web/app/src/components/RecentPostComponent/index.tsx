import React from "react";
import useSWR from "swr";
import { Empty, List } from "antd";
import LinkFooter from "src/components/common/LinkFooter";
import LoadingComponent from "src/components/LoadingComponent";
import BoardRepository from "src/repositories/BoardRepository";
import TextBoardItem from "src/components/BoardComponent/TextBoardItem";
import TextBoardHeader from "src/components/BoardComponent/TextBoardHeader";
import { PostEntity } from "src/models/PostEntity";
import { Media } from "src/lib/fresnel";

type RecentPostComponentProps = {
  artistId: number,
}

export default function RecentPostComponent({ artistId }: RecentPostComponentProps) {
  const { data, isValidating } = useSWR<PostEntity[]>(`PostListRecent-${ artistId }`, () => {
    return BoardRepository.getPostListRecent(artistId, 10);
  }, { revalidateOnFocus: false });

  return (
    <div style={ { margin: "40px 0" } }>
      <h2 style={ { margin: 20 } }>최근 게시물</h2>

      { isValidating
        ? <LoadingComponent desc="게시물을 불러오는 중입니다" vSpace={ 100 }/>
        : <>
          <Media lessThan="md">
            <List
              dataSource={ data }
              renderItem={ TextBoardItem.Mobile }
              locale={ { emptyText: <Empty description="아직 게시물이 없어요...ㅠ" style={ { color: "rgba(0, 0, 0, 0.5)" } }/> } }
              header={ undefined }
              footer={ <LinkFooter href={ `/artist/${ artistId }/board` }/> }
              bordered
            />
          </Media>

          <Media greaterThanOrEqual="md">
            <List
              dataSource={ data }
              renderItem={ TextBoardItem.PC }
              locale={ { emptyText: <Empty description="아직 게시물이 없어요...ㅠ" style={ { color: "rgba(0, 0, 0, 0.5)" } }/> } }
              header={ <TextBoardHeader/> }
              footer={ <LinkFooter href={ `/artist/${ artistId }/board` }/> }
              bordered
            />
          </Media>
        </>
      }
    </div>
  )
}
