import React, { PropsWithChildren, ReactNode } from "react";
import Head from "next/head";
import Header from "src/components/MainLayout/Header";
import Footer from "src/components/MainLayout/Footer";

export default function MainLayout({ children }: PropsWithChildren<ReactNode>) {
  return (
    <>
      <Head>
        <title>AirLog</title>
      </Head>

      <div style={ { backgroundColor: "white", padding: "0 30px" } }>
        <Header/>

        { children }

        <Footer/>
      </div>
    </>
  )
}
