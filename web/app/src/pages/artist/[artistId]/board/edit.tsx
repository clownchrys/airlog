import ArtistLayout from "src/components/ArtistLayout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import LoadingComponent from "src/components/LoadingComponent";
import useSWR from "swr";
import BoardRepository from "src/repositories/BoardRepository";
import EditorComponent from "src/components/EditorComponent";

type Query = {
  artistId: string
  postId?: string
}

export default function ArtistBoardEdit() {
  const router = useRouter<Query>();
  const { query: { artistId, postId } } = router;
  const [ session, isLoading ] = useSession();
  const currentUser = session?.user?.email;

  const { data: post, isValidating } = useSWR(`Post-${ postId }`, () => {
    return postId ? BoardRepository.getPost(parseInt(postId)) : undefined
  }, { revalidateOnFocus: false });

  if (isLoading) {
    return <LoadingComponent desc="사용자의 세션정보를 읽는 중입니다" vSpace={ 200 }/>;
  } else if (!currentUser) {
    router.push("/login");
    return <p>Error...유저 정보를 확인할 수 없습니다</p>;
  }

  if (postId) {
    if (isValidating) {
      return <LoadingComponent desc="원본 게시글을 확인하는 중입니다" vSpace={ 200 }/>;
    } else if (!post) {
      router.back();
      return <p>Error...원본 게시글이 존재하지 않습니다</p>;
    } else if (currentUser !== post.writer.email) {
      router.back();
      return <p>Error...원본 게시글에 대한 유저 정보가 일치하지 않습니다</p>;
    }
  }

  return <EditorComponent artistId={ artistId } currentUser={ currentUser } post={ post }/>
}

ArtistBoardEdit.Layout = ArtistLayout;