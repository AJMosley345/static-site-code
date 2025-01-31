import React from "react";
import Sidebar from "./Sidebar";
import "../pages/css/github-markdown.css";
import { Container } from "@mui/material";

const Layout = ({ children, pages }) => {
    return(
      <div 
      className="markdown-body" 
      style={{ 
        display: "flex", 
        height: "100vh",
        backgroundColor: "#0d1117",
        margin: 0, 
        padding: 0,
      }}
      >
        <Sidebar pages={pages} />
        <main 
          style={{ 
            flexGrow: 1, 
            padding: "20px", 
            marginLeft: "240px",
            height: "100vh",
            overflowY: "auto",
            }}
        >
          <Container
          maxWidth={false}
          disableGutters
          style={{
            padding: "20px",
            height: "100%",
          }}
          >
            {children}
          </Container>
        </main>
      </div>
    )
  };

export default Layout;