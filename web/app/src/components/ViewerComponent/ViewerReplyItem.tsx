import { PostReplyEntity } from "src/models/PostReplyEntity";
import { ViewerComponentProps } from "src/components/ViewerComponent/index";
import { isString } from "lodash";
import { decodeEmail } from "src/lib/next-auth/common";
import { css } from "@emotion/react";
import BoardRepository from "src/repositories/BoardRepository";
import { Button, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { toDisplayDate } from "src/utils/data";

const itemCss = css`
  .ant-list-item-meta-description {
    color: rgba(0, 0, 0, 0.85);
  }

  .ant-list-item-meta-title {
    color: rgba(0, 0, 0, 0.55);
  }
`;

export type TextViewerReplyItemProps = {
  reply: PostReplyEntity
} & Pick<ViewerComponentProps, "revalidate" | "sessionUser">

export function TextViewerReplyItem({ reply: { id, writer, content, post, updatedAt, createdAt }, revalidate, sessionUser }: TextViewerReplyItemProps) {
  let displayWriter: string;
  const writerEmail = isString(writer) ? writer : writer.email;

  if (writerEmail) {
    const { email, providerId } = decodeEmail(writerEmail);
    displayWriter = `${ email } (${ providerId })`;
  } else {
    displayWriter = "알 수 없음";
  }

  const deleteReply = () => {
    if (sessionUser !== writerEmail) {
      alert("삭제할 권한이 없습니다");
      return;
    } else if (confirm("댓글을 삭제하시겠습니까?")) {
      BoardRepository.deleteReply(id)
        .then(() => revalidate())
        .catch((err: Error) => {
          alert("댓글을 삭제할 수 없습니다");
          console.log(err);
        });
    }
  }

  return (
    <List.Item key={ id } css={ itemCss }>
      <List.Item.Meta
        title={ `${ displayWriter } - ${ toDisplayDate(createdAt) }` }
        description={ content }
      />
      <div>
        <Button icon={ <DeleteOutlined/> } onClick={ deleteReply } danger/>
      </div>
    </List.Item>
  )
}
