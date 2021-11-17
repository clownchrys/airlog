import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { List, Space, Typography } from "antd";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { toDisplayDate } from "src/utils/data";
import { PostEntity } from "src/models/PostEntity";
import { TextBoardFields } from "src/components/BoardComponent/TextBoard";
import { decodeEmail } from "src/lib/next-auth/common";

const parsePostEntity = ({ writer: { email: writerEmail }, createdAt }: Pick<PostEntity, "writer" | "createdAt">) => ({
  displayWriter: writerEmail
    ? `${ decodeEmail(writerEmail).email } (${ decodeEmail(writerEmail).providerId })` : "알 수 없음",
  displayDate: toDisplayDate(createdAt, true)
})

type Query = { artistId: string };

type IconTextProps = {
  icon: any,
  text: string
}

function IconText({ icon, text }: IconTextProps) {
  return (
    <Space>
      { React.createElement(icon) }
      { text }
    </Space>
  )
}

const TextBoardItem = {
  PC ({ id, title, writer, replyList, likeList, viewCount, createdAt }: PostEntity) {
    const { artistId } = useRouter<Query>().query;
    const url = `/artist/${ artistId }/board/view?postId=${ id }`;
    const { displayWriter, displayDate } = parsePostEntity({ writer, createdAt });

    return <div css={ [ TextBoardFields, { padding: "16px 24px" } ] }>
      <div id="id">{ id }</div>
      <div id="title">
        <Link href={ url } passHref>
          <a>
            <Typography.Text ellipsis={ { tooltip: title } }>{ title }</Typography.Text>
          </a>
        </Link>
      </div>
      <div id="writer">
        <Typography.Text ellipsis={{ tooltip: displayWriter }}>{ displayWriter }</Typography.Text>
      </div>
      <div id="createdAt">
        <Typography.Text ellipsis={{ tooltip: displayDate }}>{ displayDate }</Typography.Text>
      </div>
      <div id="view">{ viewCount }</div>
      <div id="reply">{ replyList?.length ?? 0 }</div>
      <div id="like">{ likeList?.length ?? 0 }</div>
    </div>
  },

  Mobile ({ id, title, writer, replyList, likeList, viewCount, createdAt }: PostEntity) {
    const { artistId } = useRouter<Query>().query;
    const url = `/artist/${ artistId }/board/view?postId=${ id }`;
    const { displayWriter, displayDate } = parsePostEntity({ writer, createdAt });

    return <Link href={ url } passHref>
      <a>
        <List.Item actions={ [
          <IconText icon={ HeartOutlined } text={ `${ likeList.length }` } key="list-vertical-like-o"/>,
          <IconText icon={ MessageOutlined } text={ `${ replyList.length }` } key="list-vertical-message"/>,
        ] }>
          <List.Item.Meta
            avatar={ <p>{ id }</p> }
            title={ title }
            description={ <>{ displayWriter }<br/>{ displayDate }</> }
          />⠀</List.Item>
      </a>
    </Link>
  }
}

export default TextBoardItem;
