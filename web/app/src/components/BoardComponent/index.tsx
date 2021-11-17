import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Button, Form, FormProps, Input } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import TextBoard from "src/components/BoardComponent/TextBoard";
import { PostEntity } from "src/models/PostEntity";
import BoardRepository from "src/repositories/BoardRepository";
import { Media, ResponsiveProps } from "src/lib/fresnel";

function SearchForm({ form, onFinish, isMobile }: Required<Pick<FormProps, "form" | "onFinish">> & ResponsiveProps) {
  const style: React.CSSProperties = {
    marginTop: 20,
    display: "flex",
    width: isMobile ? "100%" : "70%",
    minWidth: isMobile ? undefined : "500px",
    margin: "auto",
    gap: 10
  }
  return (
    <Form form={ form } style={ style } onFinish={ onFinish }>
      <Form.Item name="inputText" style={ { flexGrow: 1 } }>
        <Input placeholder="검색어를 입력해주세요" style={ { height: 40, fontSize: 15 } }/>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" icon={ <SearchOutlined style={{ fontSize: 25 }}/> } style={{ width: 70, height: 40 }}/>
      </Form.Item>
    </Form>
  )
}

type BoardComponentProps = {
  artistId: string
  title: string
}

export default function BoardComponent({ artistId, title }: BoardComponentProps) {
  const [ searchKeyword, setSearchKeyword ] = useState<string>();
  const [ form ] = Form.useForm();

  const {
    data: postList,
    error: postError,
    isValidating: postIsValidating
  } = useSWR<PostEntity[]>(`PostList-${ artistId }`, () => BoardRepository.getPostList(parseInt(artistId)));

  const {
    data: searchList,
    error: searchError,
    isValidating: searchIsValidating
  } = useSWR<PostEntity[]>(`SearchList-${ searchKeyword }`, () => {
    return searchKeyword ? BoardRepository.searchPost(parseInt(artistId), searchKeyword) : [];
  }, { revalidateOnFocus: false });

  const onSubmitKeyword: FormProps<{ inputText: string }>["onFinish"] = ({ inputText }) => {
    setSearchKeyword(inputText);
    form.resetFields();
  }

  if ( (!searchKeyword && postError) || (searchKeyword && searchError) ) {
    return <p>Error...게시글을 불러올 수 없습니다</p>
  }
  if (searchKeyword && searchError) {
    return <p>Error...게시글을 불러올 수 없습니다</p>
  }

  return <>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <h2 style={ { margin: 20 } }>{ searchKeyword ? `"${ searchKeyword }" 의 검색 결과` : title }</h2>
      {
        searchKeyword &&
        <Button shape="circle" size="small" icon={ <CloseOutlined/> } onClick={ () => setSearchKeyword(undefined) }/>
      }
    </div>

    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextBoard
        postList={ searchKeyword ? searchList : postList }
        isLoading={ searchKeyword ? searchIsValidating : postIsValidating }
        initPage={ 1 }
        pageSize={ 10 }
        style={ { alignSelf: "stretch" } }
      />

      <div style={{ marginTop: 30 }}>
        <Media lessThan="md">
          <SearchForm form={ form } onFinish={ onSubmitKeyword } isMobile={ true }/>
        </Media>
        <Media greaterThanOrEqual="md">
          <SearchForm form={ form } onFinish={ onSubmitKeyword } isMobile={ false }/>
        </Media>
      </div>

      <Link href={ `/artist/${ artistId }/board/edit` } passHref>
        <Button type="primary" size="large" style={{ alignSelf: "flex-end", padding: "10px 30px" }}>글쓰기</Button>
      </Link>
    </div>
  </>;
}
