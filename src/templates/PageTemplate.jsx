import * as React from "react";
import { graphql } from "gatsby";
import "../pages/css/github-markdown.css";
import { MarkdownRenderer as Markdown } from "../components/MarkdownRenderer";

export default function PageTemplate({ data, pageContext }) {
  const { markdownRemark } = data;
  const { frontmatter } = markdownRemark;
  const { folderName } = pageContext;

  return (
      <article className="markdown-body">
        <div> 
        {folderName
          ? <h1>{frontmatter.title} - {frontmatter.date} - Category: {folderName}</h1>
          : <h1>{frontmatter.title}</h1>
        }
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
`;
