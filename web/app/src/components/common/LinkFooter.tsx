import Link from "next/link";
import React from "react";

type LinkFooterProps = {
  href: string
}

export default function LinkFooter({ href }: LinkFooterProps) {
  return <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Link href={ href } passHref>
      <a>더 보기</a>
    </Link>
  </div>
}
