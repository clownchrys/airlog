import { Interpolation, Theme } from "@emotion/react";

declare module "src/components/Timeline/index" {
  /* followings need to migrate to other module paths */

  export type CircleProperties = {
    size?: string,
    bgColor?: string,
  }

  export type FontProperties = {
    color?: string,
    size?: string,
    weight?: string | number,
  }

  export type TextConfigType = FontProperties & {
    value: string
  }
  export type IconConfigType = {
    element: JSX.Element,
    side: "left" | "right",
    pos: string
  }

  // ContentRow
  export type ContentKind = "vlive"
    | "official"
    | "stage"
    | "activity"
    | "fanMade";
  export type ContentItem = {
    id: number,
    title: string,
    start: string,
    kind: ContentKind,
    like: number
  }
  export type ContentItemSet = {
    date: string,
    items: ContentItem[]
  }
  export type ContentItemsProps = {
    items: ContentItem[]
  }
}
