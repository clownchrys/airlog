import React from "react";
import { useRouter } from "next/router";
import ArtistLayout from "src/components/ArtistLayout";
import BoardComponent from "src/components/BoardComponent";

type WithArtistId = { artistId: string };

export default function ArtistBoard() {
  const { query: { artistId } } = useRouter<WithArtistId>();

  if (!artistId) {
    return <p>Error...</p>
  }

  return <BoardComponent title="커뮤니티" artistId={ artistId }/>;
}

ArtistBoard.Layout = ArtistLayout;