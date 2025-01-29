import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
const path = require("path");

const IndexPage = ({ data }) => {
  const pages = data.allMarkdownRemark.edges;
  
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
    <Layout>
      <div>
        <h1>Welcome to My Site</h1>
        {/* Render files in 'content' folder */}
        {groupedPages.content && (
          <>
            <h2>General Info</h2>
            <ul>
              {groupedPages.content.map(({ id, frontmatter }) => (
                <li key={id}>
                  <Link to={frontmatter.slug}>{frontmatter.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Render files in other folders */}
        {Object.keys(groupedPages).filter(folder => folder !== 'content').map(folder => (
          <React.Fragment key={folder}>
            <h2>{folder.charAt(0).toUpperCase() + folder.slice(1)}</h2>
            <ul>
              {groupedPages[folder].map(({ id, frontmatter }) => (
                <li key={id}>
                  <Link to={frontmatter.slug}>{frontmatter.title}</Link>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
      edges {
        node {
          id
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