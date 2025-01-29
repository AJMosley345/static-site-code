import * as React from "react";
import { graphql, Link } from "gatsby";
import "../pages/css/github-markdown.css";
import "./pagetemplate.css";
import { MarkdownRenderer as Markdown } from "../components/MarkdownRenderer";

export default function PageTemplate({ data, pageContext }) {
  const { markdownRemark } = data;
  const { frontmatter } = markdownRemark;
  const { folderName } = pageContext;

  return (
    <article className="markdown-body">
      <div>
        <Link to="/">Home</Link>
        <h1>{frontmatter.title} - {frontmatter.date} - Category: {folderName}</h1>
        <Markdown
          children={markdownRemark.rawMarkdownBody}
        />
      </div>
    </article>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      rawMarkdownBody
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
      }
    }
  }
`
