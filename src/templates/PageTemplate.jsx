import * as React from "react"
import { graphql, Link } from "gatsby"
import "../pages/css/github-markdown.css"
import ReactMarkdown from 'react-markdown'

export default function PageTemplate({
    data, pageContext
}) {
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark
    const { folderName } = pageContext;
    return(
        <article className="markdown-body">
          <div>
              <Link to="/">Home</Link>
              <h1>{frontmatter.title} - {frontmatter.date}</h1>
              {/* Conditionally display the folder name if available */}
              {folderName && <h3>Category: {folderName}</h3>}
              <ReactMarkdown>{html}</ReactMarkdown>
          </div>
        </article>
    )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
      }
    }
  }
`