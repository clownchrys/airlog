import { ComponentType, ReactNode } from "react";
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext, NextLayoutComponentType } from 'next';
import { NextRouter } from "next/dist/client/router";
import { ParsedUrlQuery } from "querystring";

declare module "next" {
  export type NextLayoutComponentType<P = {}> = NextComponentType<NextPageContext, any, P> & {
    getLayout?: (page: ReactNode) => ReactNode;
    Layout?: ComponentType;
  };

  export interface NextApiRequest<
    Query = { [key: string]: string | string[] },
    Body = any,
    Params = { [key: string]: string | string[] }
  > {
    query: Query,
    body: Body,
    params: Params & { wild: string }
  }
}

declare module "next/app" {
  export type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}

declare module "next/router" {
  export declare function useRouter<Query = ParsedUrlQuery>(): NextRouter & {
    query: Query
  };
}
