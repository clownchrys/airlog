import React from "react";
import { css } from "@emotion/react";
import { TextBoardFields } from "src/components/BoardComponent/TextBoard";

const heading = css`
  font-weight: bold;
`;

export default function TextBoardHeader() {
  return (
    <div css={ [ TextBoardFields, heading ] }>
      <div id="id">ID</div>
      <div id="title">제목</div>
      <div id="writer">작성자</div>
      <div id="createdAt">작성일</div>
      <div id="view">조회</div>
      <div id="reply">댓글</div>
      <div id="like">좋아요</div>
    </div>
  )
}


