import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as syntaxStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
//import { a11ydark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
//const a11yDark = require('react-syntax-highlighter/dist/cjs/styles/prism/vs-dark');

export function MarkdownRenderer({ children: markdown }) {
    console.log(require('react-syntax-highlighter/dist/cjs/styles/prism')); 
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter style={syntaxStyle} PreTag="div" language={match[1]} {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}