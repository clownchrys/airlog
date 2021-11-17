import { NextPageContext } from "next";

type PropTypes = {
  renderOn: string,
  id: number,
  ENV?: string,
  NEXT_PUBLIC_ENV?: string
};

export default function Labs(props: PropTypes) {
  return (
    <>
      <p>Rendered on { props.renderOn }</p>
      <p>Given ID { props.id }</p>
      <div>
        <li>On Server</li>
        <ul>ENV: { props.ENV }</ul>
        <ul>NEXT_PUBLIC_ENV: { props.NEXT_PUBLIC_ENV }</ul>
      </div>
      <div>
        <li>On Client</li>
        <ul>ENV: { process.env.NODE_ENV }</ul>
        <ul>NEXT_PUBLIC_ENV: { process.env.NEXT_PUBLIC_ENV }</ul>
      </div>
    </>
  );
}

Labs.getInitialProps = async ({ req }: NextPageContext): Promise<PropTypes> => {
  return {
    renderOn: req ? "server-side" : "client-side",
    id: Math.random(),
    ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV
  };
}