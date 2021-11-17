import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/client";
import { isString } from "lodash";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ArtistRepository from "src/repositories/ArtistRepository";
import { ArtistEntity } from "src/models/ArtistEntity";
import LoadingComponent from "src/components/LoadingComponent";

const Container = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 200px;
  background-image: url("${ props => props.bgImage }");
  background-size: cover;
  background-position: center;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  #artist-name {
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 10px;
    padding: 5px;
    @media screen and (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const blur = css`
  color: black;
  background-color: #ffffff90;
  background-blend-mode: screen;
`;

type FollowingButtonProps = {
  isFollowing: boolean
  followDate: string
  onClick: () => void
}

function FollowingButton({ isFollowing, followDate, onClick }: FollowingButtonProps) {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: isFollowing ? "red" : "grey",
    color: isFollowing ? "white" : "black",
    border: "none",
    padding: "10px 30px",
    cursor: "pointer"
  };
  const displayDate = new Date(followDate).toLocaleDateString("ko");

  return <div style={{ alignSelf: "flex-end", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
    <button style={ buttonStyle } onClick={ onClick }>
      { isFollowing ? "팔로잉" : "팔로우" }
    </button>
    { isFollowing && <div style={ { height: 30, padding: "5px 10px" } } css={ blur }>팔로우한 날짜: { displayDate }</div> }
  </div>
}

export type FollowSectionProps = {
  artistId: number;
}

export default function FollowSection({ artistId }: FollowSectionProps) {
  const [ session, isLoading ] = useSession();
  const { data, isValidating, revalidate } = useSWR<ArtistEntity>(`Artist-${ artistId }`, () => ArtistRepository.getArtist(artistId), {
    revalidateOnFocus: false
  });

  if (isValidating || isLoading) {
    return <LoadingComponent desc="아티스트 정보를 불러오는중 입니다" vSpace={ 80 }/>
  }

  const { name, bgImage, followerList } = data ?? { name: "등록되지 않은 아티스트", bgImage: "", followerList: [] };
  const sessionUser = session?.user?.email;
  const followEntities = followerList.filter(({ user }) => isString(user) ? user : user?.email === sessionUser);
  const followEntity = followEntities.length === 0 ? null : followEntities[0];
  const isFollowing = !!followEntity;

  const changeFollowStatus = () => {
    if (!sessionUser) {
      alert("로그인이 필요합니다");
      return;
    }
    ( isFollowing ? ArtistRepository.unfollowArtist(artistId, sessionUser) : ArtistRepository.followArtist(artistId, sessionUser))
      .then(() => revalidate())
      .catch((err: Error) => {
        console.log(err);
        alert("팔로우 상태를 변경할 수 없습니다");
      })
  }
  const notifyEmpty = () => {
    alert("등록되지 않은 아티스트입니다. 관리자에게 등록을 요청해주세요.");
  }

  return (
    <Container bgImage={ bgImage }>
      <div id="artist-name" css={ [ blur, { alignSelf: "flex-start" } ] }>{ name }</div>
      <FollowingButton  isFollowing={ isFollowing } followDate={ followEntity?.createdAt ?? "" } onClick={ data ? changeFollowStatus : notifyEmpty }/>
    </Container>
  );
}