import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemText, IconButton, Typography, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "gatsby";
import { useMediaQuery } from "@mui/material";
import "../pages/css/github-markdown.css";
import "../components/components.css";

const Sidebar = ({ pages = {} }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:600px)"); // Detects if on desktop

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  // Sidebar content (shared between mobile & desktop)
  const sidebarContent = (
    <List sx={{ padding: 2, backgroundColor: "#161923", color: "white", height: "100vh" }}>
      {/* Mobile Close Button */}
      {!isDesktop && (
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
            zIndex: 1201,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      {/* Home Button */}
      <ListItemButton component={Link} to="/">
        <ListItemText primary="Home" sx={{ color: "#bbb" }} />
      </ListItemButton>

      {/* Render files in base folder */}
      {pages.content && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ddd", mt: 2 }}>General Info</Typography>
          <Divider sx={{ backgroundColor: "#444", mb: 1 }} />
          {pages.content
            .filter(({ frontmatter }) => frontmatter.slug !== "/")  // Exclude homepage
            .map(({ id, frontmatter }) => (
              <ListItemButton key={`${frontmatter.slug}-${id}`} component={Link} to={frontmatter.slug}>
                <ListItemText primary={frontmatter.title} sx={{ color: "#bbb" }} />
              </ListItemButton>
            ))}
        </>
      )}

      {/* Render files in other folders */}
      {Object.keys(pages).filter(folder => folder !== 'content').map((folder) => (
        <React.Fragment key={`folder-${folder}`}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ddd", mt: 2 }}>
            {folder.charAt(0).toUpperCase() + folder.slice(1)}
          </Typography>
          <Divider sx={{ backgroundColor: "#444", mb: 1 }} />
          {pages[folder].map(({ id, frontmatter }) => (
            <ListItemButton key={`${frontmatter.slug}-${id}`} component={Link} to={frontmatter.slug}>
              <ListItemText primary={frontmatter.title} sx={{ color: "#bbb" }} />
            </ListItemButton>
          ))}
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {!isDesktop && (
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            color: "white",
            zIndex: 1200,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: 240, backgroundColor: "#161923" },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop Sidebar (always visible) */}
      {isDesktop && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: 240, backgroundColor: "#161923", color: "white" },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;

