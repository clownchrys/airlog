declare module "vertical-timeline-component-for-react" {
  import "vertical-timeline-component-for-react/dist/Timeline.css";
  import { CSSProperties, ReactNode } from "react";

  type TimelineProps = {
    lineColor: string
  }
  type TimelineItemProps = {
    dateText?: string,
    dateInnerStyle?: CSSProperties,
    bodyContainerStyle?: CSSProperties,
    dateComponent?: ReactNode,
    style?: CSSProperties
  }

  interface test {
    id: _props.id,
    children: _props.children,
    dateText: _props.dateText,
    dateStyle: _props.dateStyle,
    dateComponent: _props.dateComponent,
    dateInnerStyle: _props.dateInnerStyle,
    bodyContainerStyle: _props.bodyContainerStyle,
    style: _props.style,
    className: _props.className,
    visibilitySensorProps: _props.visibilitySensorProps
  }

  // export function Timeline(props: TimelineProps): JSX.Element
  export class Timeline extends React.Component<TimelineProps> {}
  export class TimelineItem extends React.Component<TimelineItemProps> {}
}