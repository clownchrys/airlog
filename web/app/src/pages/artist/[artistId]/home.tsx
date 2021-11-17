import React from "react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import ArtistLayout from "src/components/ArtistLayout";
import TodayScheduleComponent from "src/components/TodayScheduleComponent";
import RecentPostComponent from "src/components/RecentPostComponent";

type Query = {
  artistId: string
}

export default function ArtistHome({ props }: Partial<ReturnType<typeof getServerSideProps>>) {
  const router = useRouter<Query>();
  const artistId = parseInt(props?.artistId ?? router.query.artistId);

  return <>
    <TodayScheduleComponent artistId={ artistId }/>
    <RecentPostComponent artistId={ artistId }/>
  </>;
}

export function getServerSideProps({ query: { artistId } }: NextPageContext) {
  return {
    props: { artistId: artistId?.toString() }
  }
}

ArtistHome.Layout = ArtistLayout;