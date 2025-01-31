import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemText, IconButton, Typography, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "gatsby";
import "../pages/css/github-markdown.css";
import "../components/components.css"
const Sidebar = ({ pages = {} }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <>
      {/* Mobile menu button */}
      <IconButton onClick={toggleDrawer(true)} sx={{ display: { sm: "none" }, position: "absolute", top: 16, left: 16, color: "white" }}>
        <MenuIcon />
      </IconButton>
      
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", padding: 2, backgroundColor: "#161923", color: "white" },
          display: { xs: open ? "block" : "none", sm: "block" },
          position: "fixed"
        }}
        className="markdown-body"
      >
        <List sx={{ padding: 0 }}>
          {/* Home Button */}
          <ListItemButton component={Link} to="/" sx={{ textAlign: "left", backgroundColor: "#222", mb: 1 }}>
            <ListItemText primary="Home" sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }} />
          </ListItemButton>
          {/* Render files in base folder */}
          {pages.content && (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ddd", mt: 2, textAlign: "left" }}>General Info</Typography>
              <Divider sx={{ backgroundColor: "#444", mb: 1 }} />
              {pages.content
                .filter(({ frontmatter }) => frontmatter.slug !== "/")  // Exclude items with slug "/"
                .map(({ id, frontmatter }) => (
                  <ListItemButton key={`${frontmatter.slug}-${id}`} component={Link} to={frontmatter.slug} sx={{ textAlign: "left", alignItems: "flex-start" }}>
                    <ListItemText primary={frontmatter.title} sx={{ color: "#bbb" }} />
                  </ListItemButton>
                ))
              }
            </>
          )}
          {/* Render files in other folders */}
          {Object.keys(pages).filter(folder => folder !== 'content').map((folder) => (
            <React.Fragment key={`folder-${folder}`}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ddd", mt: 2, textAlign: "left" }}>
                {folder.charAt(0).toUpperCase() + folder.slice(1)}
              </Typography>
              <Divider sx={{ backgroundColor: "#444", mb: 1 }} />
              {pages[folder].map(({ id, frontmatter }) => (
                <ListItemButton key={`${frontmatter.slug}-${id}`} component={Link} to={frontmatter.slug} sx={{ textAlign: "left" }}>
                  <ListItemText primary={frontmatter.title} sx={{ color: "#bbb" }} />
                </ListItemButton>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
