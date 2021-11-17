import { Button, Form, Input, List } from "antd";
import { PaginationConfig } from "antd/lib/pagination";
import { PostReplyEntity, PostReplyEntityCreate } from "src/models/PostReplyEntity";
import { ViewerComponentProps } from "src/components/ViewerComponent/index";
import { TextViewerReplyItem } from "src/components/ViewerComponent/ViewerReplyItem";
import { FormOutlined } from "@ant-design/icons";
import React from "react";
import { FormProps } from "antd/es/form";
import BoardRepository from "src/repositories/BoardRepository";

export default function TextViewerReply({ post: { id, replyList }, revalidate, sessionUser }: ViewerComponentProps) {
  const [ form ] = Form.useForm();

  const pagination: PaginationConfig = {
    position: "bottom",
    pageSize: 5,
    defaultCurrent: 1,
    total: replyList?.length ?? 0,
    size: "small",
    style: { display: "flex", justifyContent: "center" },
    onChange: (page, pageSize) => console.log({ page, pageSize }),
  };

  const onSubmitForm: FormProps<{ inputText: string }>["onFinish"] = ({ inputText }) => {
    if (!sessionUser) {
      alert("로그인이 필요합니다");
    } else if (inputText.trim().length === 0) {
      alert("내용이 입력되지 않았습니다");
    } else {
      const replyCreate: PostReplyEntityCreate = {
        content: inputText,
        writerEmail: sessionUser,
        postId: id
      }
      BoardRepository.createReply(replyCreate)
        .then(() => form.resetFields())
        .then(() => revalidate())
        .catch((err: Error) => {
          alert("댓글 등록 요청에 실패했습니다");
          console.log(err);
        })
    }
  }

  return <div style={ { padding: "30px 0" } }>
    <h2>댓글</h2>

    <List
      size={ "large" }
      dataSource={ replyList }
      renderItem={ (reply: PostReplyEntity) => <TextViewerReplyItem reply={ reply } revalidate={ revalidate } sessionUser={ sessionUser }/> }
      pagination={ pagination }
      bordered
    />

    <Form form={ form } style={ { marginTop: 20, display: "flex", gap: 10 } } onFinish={ onSubmitForm }>
      <Form.Item name="inputText" style={{ flexGrow: 1 }}>
        <Input.TextArea placeholder="댓글을 입력해주세요" autoSize allowClear/>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          icon={ <FormOutlined style={ { color: "white", fontWeight: "bold" } }/> }
          style={ { backgroundColor: "#40a9ff", width: "80px", border: "none" } }
        />
      </Form.Item>
    </Form>
  </div>
}
