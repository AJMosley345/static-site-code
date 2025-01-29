import React from "react";
import "./components.css";
import "../pages/css/github-markdown.css";


const Layout = ({ children }) => {
  return (
    <div className="markdown-body">
      <main>{children}</main>
    </div>
  )
}

export default Layout