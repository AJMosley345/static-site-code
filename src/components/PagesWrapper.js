import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "./Layout";
import "../pages/css/github-markdown.css";
const path = require("path");

const PagesWrapper = ({ element }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `);

  const groupedPages = data.allMarkdownRemark.edges.reduce((acc, { node }) => {
    const folderPath = path.dirname(node.fileAbsolutePath);
    const folderName = path.basename(folderPath);

    if (!acc[folderName]) {
      acc[folderName] = [];
    }
    acc[folderName].push(node);
    return acc;
  }, {});

  return (
    <Layout pages={groupedPages}>
        <div style={{
            backgroundColor: "#0d1117",
            margin: 0,
            padding: 0
        }}>
            {element}
        </div>  
    </Layout>
  );
};

export default PagesWrapper;