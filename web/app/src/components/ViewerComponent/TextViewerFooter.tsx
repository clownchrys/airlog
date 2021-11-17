import { useRouter } from "next/router";
import BoardRepository from "src/repositories/BoardRepository";
import { Button } from "antd";
import { ContainerFilled, DeleteFilled, EditFilled, HeartFilled, HeartOutlined } from "@ant-design/icons";
import React from "react";
import { ViewerComponentProps } from "src/components/ViewerComponent/index";
import { isString } from "lodash";
import { Media } from "src/lib/fresnel";

export default function TextViewerFooter({ post: { id, artist, writer, likeList }, revalidate, sessionUser }: ViewerComponentProps) {
  const router = useRouter();

  const likeCount = likeList.length;
  const isLike = likeList
    .map(value => isString(value.user) ? value.user : value.user.email)
    .includes(sessionUser);

  const toBoard = () => router.push(`/artist/${ artist.id }/board`);

  const routeToUpdate = () => router.push({
    pathname: `/artist/${ artist.id }/board/edit`,
    query: { postId: id }
  });

  const deletePost = () => {
    if (!sessionUser) {
      alert("로그인이 필요합니다");
    } else if (confirm("게시물을 삭제하시겠습니까?")) {
      BoardRepository.deletePost(id)
        .then(() => {
          (window.history.length) ? router.back() : toBoard();
        })
        .catch((err: Error) => {
          alert("게시물을 삭제할 수 없습니다");
          console.log(err);
        });
    }
  };

  const changeLike = () => {
    if (!sessionUser) {
      alert("로그인이 필요합니다");
    } else {
      (isLike ? BoardRepository.unlikePost(id, sessionUser) : BoardRepository.likePost(id, sessionUser))
        .then(() => {revalidate()})
        .catch((err: Error) => {
          alert("좋아요 상태를 변경할 수 없습니다");
          console.log(err);
        });
    }
  }

  return <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div style={{ display: "flex", gap: 10, fontSize: "1.1rem" }}>
      <Button
        icon={ isLike ? <HeartFilled style={ { color: "red", marginRight: 10 } }/> : <HeartOutlined style={{ marginRight: 10 }}/> }
        size="large"
        onClick={ changeLike }
        style={{ minWidth: 90 }}
      >{ likeCount }</Button>
    </div>

    <div style={{ display: "flex", gap: 10 }}>
      <Media lessThan="md">
        <Button size="large" onClick={ routeToUpdate }>{ "수정하기" }</Button>
        <Button size="large" onClick={ deletePost }>{ "삭제하기" }</Button>
        <Button size="large" onClick={ toBoard }>{ "목록보기" }</Button>
      </Media>

      <Media greaterThanOrEqual="md">
        <Button size="large" onClick={ routeToUpdate }>{ <EditFilled/> }</Button>
        <Button size="large" onClick={ deletePost }>{ <DeleteFilled/> }</Button>
        <Button size="large" onClick={ toBoard }>{ <ContainerFilled/> }</Button>
      </Media>
    </div>
  </div>
}
