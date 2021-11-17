import { HTMLAttributes, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import { MyComponentProps as FroalaEditorProps } from "react-froala-wysiwyg"
import LoadingComponent from "src/components/LoadingComponent";
import FroalaConfig from "src/components/EditorComponent/FroalaConfig";
import BoardRepository from "src/repositories/BoardRepository";
import { PostEntity, PostEntityCreate, PostEntityUpdate } from "src/models/PostEntity";
import useSWR from "swr";
import { Button } from "antd";

const loader = async () => {
  // @ts-ignore
  await import("froala-editor/js/plugins.pkgd.min.js");
  return import("react-froala-wysiwyg");
}
const FroalaEditor = dynamic<FroalaEditorProps>(loader, {
  loading() {
    return <LoadingComponent desc="에디터를 불러오는 중입니다..."/>;
  },
  ssr: false
});

const buttonCss = css`
  align-self: flex-end;
  background-color: white;
  color: black;
  border: solid 0.1px #00000070;
  padding: 10px 30px;
  font-size: 1.1rem;

  :hover {
    border: solid 0.1px transparent;
    background-color: black;
    color: white;
  }
`;

type EditorComponentProps = {
  artistId: string
  currentUser: string
  post: PostEntity | undefined
}

export default function EditorComponent({ artistId, currentUser, post }: EditorComponentProps) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<string>("");

  const { revalidate: revalidatePostList } = useSWR(`PostList-${ artistId }`, null);
  const { revalidate: revalidatePost } = useSWR(`Post-${ post?.id }`, null);

  const isUpdateMode = !!post;

  const onSubmitSuccess = () => {
    router.back();
  }

  const onSubmitFailure = (err: Error) => {
    alert("게시글을 업로드할 수 없습니다");
    console.log(err);
  }

  const createPost = () => {
    const title = titleRef.current?.value;
    const content = contentRef.current;
    if (!title || title.length == 0 || content.length == 0) {
      console.log({
        current: titleRef.current, title, content
      })
      alert("제목 또는 본문이 올바르지 않습니다");
      return;
    }
    const postCreate: PostEntityCreate = {
      title: title,
      content: contentRef.current,
      artistId: parseInt(artistId),
      writerEmail: currentUser
    }
    BoardRepository.createPost(postCreate)
      .then(onSubmitSuccess)
      .then(revalidatePostList)
      .catch(onSubmitFailure);
  }

  const updatePost = () => {
    const title = titleRef.current?.value;
    const content = contentRef.current;
    if (!title || title.length == 0 || content.length == 0) {
      alert("제목 또는 본문이 올바르지 않습니다");
      console.log({
        title, content
      })
      return;
    }
    const postUpdate: PostEntityUpdate = {
      title: title,
      content: content
    };
    BoardRepository.updatePost(post!.id, postUpdate)
      .then(onSubmitSuccess)
      .then(revalidatePost)
      .catch(onSubmitFailure);
  }

  const titleProps: HTMLAttributes<HTMLInputElement> = {
    defaultValue: isUpdateMode ? post?.title : "",
    placeholder: "제목을 입력해주세요",
    style: {
      width: "100%",
      padding: "15px 20px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "solid 1px #00000035",
    }
  }

  const editorProps: FroalaEditorProps = {
    model: post?.content ?? "",
    onModelChange: (content: string) => {
      contentRef.current = content;
      console.log(contentRef.current);
    },
    config: FroalaConfig
  }

  return <div style={ { display: "flex", flexDirection: "column", gap: "20px", zIndex: 0, marginTop: 30 } }>
    <input ref={ titleRef } { ...titleProps }/>
    <FroalaEditor { ...editorProps }/>
    <Button type="primary" size="large" onClick={ isUpdateMode ? updatePost : createPost } style={{ alignSelf: "flex-end", padding: "10px 30px", height: 50 }}>
      { isUpdateMode ? "수정하기" : "글쓰기" }
    </Button>
  </div>
}