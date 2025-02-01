import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Container } from "@mui/material";
import "../pages/css/github-markdown.css"

const Layout = ({ children, pages }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      style={{ 
        display: "flex", 
        height: "100vh",
        backgroundColor: "#0d1117",
        margin: 0, 
        padding: 0,
      }}
    >
      <Sidebar pages={pages} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      <main 
        style={{ 
          flexGrow: 1, 
          padding: "20px", 
          marginLeft: { xs: 0, sm: isCollapsed ? "80px" : "240px" },
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
  );
};

export default Layout;
