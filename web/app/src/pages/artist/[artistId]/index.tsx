import { useLayoutEffect } from "react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import LoadingComponent from "src/components/LoadingComponent";

type Query = {
  artistId: string
}

export default function ArtistIndex() {
  const router = useRouter<Query>();
  const { artistId } = router.query;

  useLayoutEffect(() => {
    router.push(`/artist/${ artistId }/home`);
  })
  return <LoadingComponent desc="Redirect to Home..."/>
}

export function getServerSideProps({ query: { artistId } }: NextPageContext) {
  return {
    redirect: {
      destination: `/artist/${ artistId }/home`,
      permanent: false,
    },
  }
}