import { Divider } from "antd";
import React from "react";

export default function Footer() {
  return <footer style={ { margin: "50px 0", textAlign: "right" } }>
    <Divider type="horizontal" style={ { borderColor: "rgba(0, 0, 0, 0.25)" } }/>
    Created by Chan Lim (<a href="https://github.com/clownchrys">GitHub</a>, <a
    href="clownchrys@gmail.com">Email</a>)
  </footer>
}