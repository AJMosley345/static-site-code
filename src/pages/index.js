import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import "./css/github-markdown.css"

const path = require("path");
const IndexPage = ({ data }) => {
  const { allMarkdownRemark } = data;
  
  const pages = allMarkdownRemark.edges;

  // Group pages by folder name (e.g., "content", "stack")
  const groupedPages = pages.reduce((acc, { node }) => {
    const folderPath = path.dirname(node.fileAbsolutePath);
    const folderName = path.basename(folderPath);
 
    // Group by folder name, default to 'content' if no folder is found
    if (!acc[folderName]) {
      acc[folderName] = [];
    }
    acc[folderName].push(node);
    return acc;
  }, {});

  return (
    <>
    <Layout pages={groupedPages}>
      <Typography variant="h1">Welcome to my website!</Typography>
      <Typography variant="p">Select a page from the sidebar.</Typography>
    </Layout>
    </>
  );
};

export const query = graphql`
query {
  allMarkdownRemark(sort: {frontmatter: {date: ASC}}) {
    edges {
      node {
        frontmatter {
          title
          slug
        }
        fileAbsolutePath
      }
    }
  }
}
`;

export default IndexPage;