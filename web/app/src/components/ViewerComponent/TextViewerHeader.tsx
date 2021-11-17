import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { decodeEmail } from "src/lib/next-auth/common";
import { toDisplayDate } from "src/utils/data";
import { ViewerComponentProps } from "src/components/ViewerComponent/index";
import { Descriptions } from "antd";
import { Media } from "src/lib/fresnel";

export default function TextViewerHeader({ post: { id, title, viewCount, createdAt, likeList, writer, artist } }: Pick<ViewerComponentProps, "post">) {
  const { email, providerId } = decodeEmail(writer.email!);
  const displayWriter = `${ email } (${ providerId })`;
  const displayUrl = `${ process.env.NEXT_PUBLIC_BASE_URL }/artist/${ artist.id }/board/view=?postId=${ id }`;

  const onCopy = (text: string, result: boolean) =>
    alert(result ? `복사 완료!\n${ text }` : "주소를 복사할 수 없습니다");

  return (
    <>
      <Media lessThan="md">
        <Descriptions size="small" labelStyle={{ fontWeight: "bold", fontSize: "0.8rem", width: 70 }} contentStyle={{ fontSize: "0.8rem" }} column={ 1 } bordered>
          <Descriptions.Item label="URL">
            <CopyToClipboard text={ displayUrl } onCopy={ onCopy } options={ { message: "copied" } }>
              <a style={ { color: "grey", alignSelf: "flex-end", fontSize: "0.8rem" } }>{ displayUrl }</a>
            </CopyToClipboard>
          </Descriptions.Item>
          <Descriptions.Item label="제목">{ title }</Descriptions.Item>
          <Descriptions.Item label="작성자">{ displayWriter }</Descriptions.Item>
          <Descriptions.Item label="작성일">{ toDisplayDate(createdAt) }</Descriptions.Item>
          <Descriptions.Item label="조회수">{ viewCount }</Descriptions.Item>
        </Descriptions>
      </Media>

      <Media greaterThanOrEqual="md">
        <Descriptions size="small" labelStyle={{ fontWeight: "bold" }} column={ 4 } bordered>
          <Descriptions.Item label="URL" span={ 4 }>
            <CopyToClipboard text={ displayUrl } onCopy={ onCopy } options={ { message: "copied" } }>
              <a style={ { color: "grey", alignSelf: "flex-end", fontSize: "0.8rem" } }>{ displayUrl }</a>
            </CopyToClipboard>
          </Descriptions.Item>
          <Descriptions.Item label="제목" span={ 4 }>{ title }</Descriptions.Item>
          <Descriptions.Item label="작성자" span={ 2 }>{ displayWriter }</Descriptions.Item>
          <Descriptions.Item label="작성일">{ toDisplayDate(createdAt) }</Descriptions.Item>
          <Descriptions.Item label="조회수">{ viewCount }</Descriptions.Item>
        </Descriptions>
      </Media>
    </>
  )
}
