import { css } from "@emotion/react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import TextViewerHeader from "src/components/ViewerComponent/TextViewerHeader";
import TextViewerFooter from "src/components/ViewerComponent/TextViewerFooter";
import TextViewerReply from "src/components/ViewerComponent/ViewerReply";
import { PostEntity } from "src/models/PostEntity";

const viewCss = css`
  margin: 10px 0;
  padding: 20px;
  border: 0.1px solid #00000030;
  border-radius: 2px;

  p {
    margin: 0;
  }
`;

export type ViewerComponentProps = {
  post: PostEntity
  revalidate: () => Promise<boolean>
  sessionUser: string | null
}

export default function ViewerComponent({ post, revalidate, sessionUser }: ViewerComponentProps) {
  return <div style={{  }}>
    <TextViewerHeader post={ post }/>

    <div css={ viewCss }>
      <FroalaEditorView model={ post.content }/>
    </div>

    <TextViewerFooter post={ post } revalidate={ revalidate } sessionUser={ sessionUser }/>
    <TextViewerReply post={ post } revalidate={ revalidate } sessionUser={ sessionUser }/>
  </div>
}