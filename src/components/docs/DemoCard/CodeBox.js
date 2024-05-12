import React from 'react'
import Markdown from 'react-markdown'
import { SyntaxHighlighter } from 'components/shared'

const Highlighter = (props) => {
    return (
        <SyntaxHighlighter className="text-base" language="jsx">
            {props.children}
        </SyntaxHighlighter>
    )
}

const CodeBox = (props) => {
    const { markdown } = props

    return (
        <Markdown
            components={{
                code: Highlighter,
            }}
        >
            {markdown}
        </Markdown>
    )
}

export default CodeBox
