/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `My Project Site`,
    siteUrl: `https://ajmosley.com`
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": `${__dirname}/src/images/icon.png`
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp",  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": `${__dirname}/src/images/`
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "content",
      "path": `${__dirname}/src/content`
    },
    // __key: "pages"
  },
  `gatsby-transformer-remark`,"gatsby-transformer-sharp", `gatsby-remark-classes`
],
};