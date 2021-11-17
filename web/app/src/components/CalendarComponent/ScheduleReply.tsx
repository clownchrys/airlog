import { CommentOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Input, Form, List, SpinProps } from "antd";
import ScheduleReplyItem from "./ScheduleReplyItem";
import React, { createRef } from "react";
import { PaginationConfig } from "antd/lib/pagination";
import { ISchedule } from "tui-calendar";
import CalendarRepository from "src/repositories/CalendarRepository";
import { ScheduleReplyEntity } from "src/models/ScheduleReplyEntity";
import { useSession } from "next-auth/client";
import useSWR from "swr";
import { TextAreaRef } from "antd/es/input/TextArea";

export default function ScheduleReply({ id }: ISchedule) {
  const inputRef = createRef<TextAreaRef>();
  const [ session, isLoading ] = useSession();
  const [ form ] = Form.useForm();
  const {
    data: replyList,
    revalidate: revalidateReplyList,
    isValidating
  } = useSWR<ScheduleReplyEntity[]>(`ReplyList-${ id }`, () => {
    return id ? CalendarRepository.getReplyList(parseInt(id)) : [];
  }, { revalidateOnFocus: false });

  const onClickDelete = (replyId: number) => () => {
    CalendarRepository.deleteReply(replyId)
      .then(revalidateReplyList)
      .catch((err: Error) => {
        console.log(err);
        alert("댓글 삭제 요청에 실패했습니다");
      })
  }

  const onSubmitForm = (data: { inputText: string }) => {
    const email = session?.user?.email;
    const { inputText } = data;

    if (inputText && inputText.length == 0) {
      alert("내용을 입력해주세요");
      return;
    }

    if (id && email) {
      const reply = { scheduleId: parseInt(id), content: inputText, writerEmail: email };
      console.log(reply);
      CalendarRepository
        .createReply(reply)
        .then(revalidateReplyList)
        .then(() => form.resetFields())
        .catch((err: Error) => {
          console.log(err);
          alert("댓글 쓰기 요청에 실패했습니다");
        })
    } else {
      alert("댓글을 작성할 수 없습니다 (Unexpected)");
    }
  }

  const loading: SpinProps = { tip: "댓글을 불러오는 중입니다...", spinning: isLoading || isValidating };
  const pagination: PaginationConfig = {
    position: "bottom",
    pageSize: 5,
    defaultCurrent: 1,
    total: replyList?.length ?? 0,
    size: "small",
    style: { display: "flex", justifyContent: "center" },
    onChange: (page, pageSize) => console.log({ page, pageSize }),
  };

  return (
    <div style={ { display: "flex", flexDirection: "column", gap: "10px" } }>
      <div>
        <CommentOutlined style={ { fontSize: "1.5rem" } }/>
        <h2 style={ { display: "inline", paddingLeft: "10px" } }>댓글</h2>
      </div>

      <Form form={ form } style={{ display: "flex", alignItems: "center" }} onFinish={ onSubmitForm }>
        <Form.Item name="inputText" style={{ flexGrow: 1 }} >
          <Input.TextArea ref={ inputRef } placeholder="댓글을 입력해주세요" autoSize allowClear/>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            icon={ <FormOutlined style={ { color: "white", fontWeight: "bold" } }/> }
            style={ { backgroundColor: "#40a9ff", width: "80px", border: "none" } }
          />
        </Form.Item>
      </Form>

      <List
        size={ "small" }
        dataSource={ replyList ?? [] }
        loading={ loading }
        pagination={ pagination }
        style={ { padding: 10 } }
        renderItem={ (item: ScheduleReplyEntity) => <ScheduleReplyItem { ...item } onClickDelete={ onClickDelete }/> }
        bordered
      />
    </div>
  )
}