import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/client";
import useSWR from "swr";
import BoardRepository from "src/repositories/BoardRepository";
import LoadingComponent from "src/components/LoadingComponent";
import ArtistLayout from "src/components/ArtistLayout";
import { PostEntity } from "src/models/PostEntity";

type Query = {
  artistId: string,
  postId: string
}

export default function View() {
  const router = useRouter<Query>();
  const { artistId, postId } = router.query;
  const [ session, isLoading ] = useSession();

  const ViewerComponent = dynamic(import("src/components/ViewerComponent"), {
    loading() {
      return <LoadingComponent desc="뷰어를 불러오는 중입니다" vSpace={ 200 }/>
    }
  })

  const { data: post, isValidating, revalidate } = useSWR<PostEntity>(`Post-${ postId }`, () => BoardRepository.getPost(parseInt(postId)), {
    revalidateOnFocus: false
  });

  if (!router.isReady || isValidating || isLoading) {
    return <LoadingComponent desc="게시물을 불러오는 중입니다" vSpace={ 200 }/>
  } else if (!artistId || !postId) {
    return <p>Error...비정상적인 접근입니다</p>;
  } else if (!post) {
    return <p>Error...게시물이 존재하지 않습니다</p>;
  } else {
    BoardRepository.viewPost(post.id);
  }

  return <ViewerComponent post={ post } revalidate={ revalidate } sessionUser={ session?.user?.email ?? null }/>;
}

View.Layout = ArtistLayout;