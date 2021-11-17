import { Spin } from "antd";
import React from "react";

export type LoadingComponentProps = {
  desc: string
  height?: number
  vSpace?: number
  isLoading?: boolean
}

export default function LoadingComponent({ desc, height, vSpace, isLoading }: LoadingComponentProps) {
  return <Spin
    tip={ desc ?? "" }
    style={ { width: "100%", height: height, margin: `${ vSpace ?? 0 }px auto` } }
    spinning={ isLoading ?? true }
  />
}
