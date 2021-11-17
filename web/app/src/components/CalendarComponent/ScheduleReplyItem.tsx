import React, { useState } from "react";
import { Button, List, Typography } from "antd";
import { ClockCircleOutlined, DeleteOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { ScheduleReplyEntity } from "src/models/ScheduleReplyEntity";
import { decodeEmail } from "src/lib/next-auth/common";
import { toDisplayDate } from "src/utils/data";

const foldIndicator = css`
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  :hover {
    background-color: #00000020;
  }
  transition: background-color 0.3s ease-in, transform 0.1s ease-in;
`;
const replyMain = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
`;
const replyDetails = css`
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: height 0.2s ease-in, opacity 0.2s ease-in;
  padding: 0 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const animRotate180 = css`
  transform: rotate(180deg);
`;
const animExpand = css`
  height: auto;
  opacity: 100%;
`;
const contentBox = css`
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;
const attrs = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const details = css`
  overflow-wrap: break-word;
  margin: 10px 0;
`;

const itemCss = css`
  .ant-list-item-meta-description {
    color: rgba(0, 0, 0, 0.85);
    
  }

  .ant-list-item-meta-title >span {
    color: rgba(0, 0, 0, 0.35);
    font-size: 0.8rem;
  }
`;

export type ReplyItemProps = {
  onClickDelete: (replyId: number) => () => void
}

export default function ScheduleReplyItem({ id, content, writer , createdAt, onClickDelete }: ScheduleReplyEntity & ReplyItemProps) {
  let displayWriter;
  if (writer.email) {
    const { email, providerId } = decodeEmail(writer.email);
    displayWriter = `${ email } (${ providerId })`;
  } else {
    displayWriter = "알 수 없음"
  }
  const displayInfo = `${ displayWriter } - ${ toDisplayDate(createdAt) }`;

  return (
    <List.Item key={ id } css={ itemCss }>
      <List.Item.Meta
        title={
          <Typography.Text ellipsis={{ tooltip: displayInfo }}>{ displayInfo }</Typography.Text>
        }
        description={ content }
      />
      <div>
        <Button size="small" icon={ <DeleteOutlined/> } onClick={ onClickDelete(id) } danger/>
      </div>
    </List.Item>
  )
}
