const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query all markdown files
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
            fileAbsolutePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error("Error fetching markdown files.");
  }

  // Create a page for each markdown file
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const slug = node.frontmatter.slug || "/";
    
    // Extract the folder name from the file path (directory structure)
    const folderPath = path.dirname(node.fileAbsolutePath);
    const folderName = path.basename(folderPath);

    // Capitalize the first letter of the folder name
    const capitalizedFolderName = folderName.charAt(0).toUpperCase() + folderName.slice(1);

    // Only include folder name if it's not the base folder "content"
    const displayFolderName = folderName !== "content" ? capitalizedFolderName : null;

    createPage({
      path: slug, // The URL for the page
      component: path.resolve(`./src/templates/PageTemplate.jsx`), // The template for the page
      context: {
        slug, // Pass the slug to the page template as context
        folderName: displayFolderName, // Pass the folder name to the page template as context (if not "content")
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
      resolve: {
        fallback: {
          path: require.resolve("path-browserify"),
        },
      },
    });
};
