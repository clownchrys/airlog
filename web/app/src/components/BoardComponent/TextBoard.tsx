import React from "react";
import { PaginationConfig } from "antd/lib/pagination";
import { List, SpinProps } from "antd";
import { css } from "@emotion/react";
import TextBoardHeader from "src/components/BoardComponent/TextBoardHeader";
import TextBoardItem from "src/components/BoardComponent/TextBoardItem";
import { PostEntity } from "src/models/PostEntity";
import { Media } from "src/lib/fresnel";

export const TextBoardFields = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  #id {
    width: 50px;
  }
  #title {
    flex-grow: 1;
  }
  #writer {
    width: 150px;
    text-align: center;
  }
  #createdAt {
    width: 100px;
    text-align: center;
  }
  #view {
    width: 50px;
    text-align: center;
  }
  #reply {
    width: 50px;
    text-align: center;
  }
  #like {
    width: 50px;
    text-align: center;
  }
`;

export type TextBoardProps = {
  postList?: PostEntity[],
  initPage?: number,
  pageSize?: number,
  isLoading?: boolean,
  style?: React.CSSProperties
}

export default function TextBoard({ postList, initPage, pageSize, isLoading, style }: TextBoardProps) {
  const pagination: PaginationConfig = {
    position: "bottom",
    pageSize: pageSize,
    defaultCurrent: initPage,
    total: postList?.length ?? 0,
    style: { display: "flex", justifyContent: "center" },
    onChange: (page, pageSize) => console.log({ page, pageSize }),
  };

  const loading: SpinProps = {
    tip: "게시글을 불러오는 중입니다...",
    spinning: isLoading,
  };

  return (
    <div style={{ width: "100%" }}>
      <Media lessThan="md">
        <List
          size={ "large" }
          dataSource={ postList }
          renderItem={ TextBoardItem.Mobile }
          header={ undefined }
          loading={ loading }
          pagination={ pagination }
          style={ style }
          bordered
        />
      </Media>

      <Media greaterThanOrEqual="md">
        <List
          size={ "large" }
          dataSource={ postList }
          renderItem={ TextBoardItem.PC }
          header={ <TextBoardHeader/> }
          loading={ loading }
          pagination={ pagination }
          style={ style }
          bordered
        />
      </Media>
    </div>
  )
}
