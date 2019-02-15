import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
})

// Define a React component renderer for our code blocks.
function CodeNode(props) {
    console.log("==CodeNode props==", props)
    return (
        <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
    )
}

// Define a React component to render bold text with.
function BoldMark(props) {
    return <strong>{props.children}</strong>
}

// Define a React component to render ItalicMark text with.
function ItalicMark(props) {
    return <i>{props.children}</i>
}

class FirstEditor extends Component {
    state = {
        value: initialValue,
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    // Define a new handler which prints the key that was pressed.
    onKeyDown = (event, editor, next) => {
        console.log("onKeyDown->",event.key)

        // if(event.key !== '&')return next()
        //
        // event.preventDefault();
        // editor.insertText('and')

        if(!event.ctrlKey) return next()

        switch (event.key){
            case 'b': {
                console.log("==bold==")
                event.preventDefault()
                editor.addMark('bold')
                break
            }

            case '`': {
                console.log("==code para==")
                // Return with no changes if it's not the "`" key with ctrl pressed.


                // Prevent the "`" from being inserted by default.
                event.preventDefault()


                // Determine whether any of the currently selected blocks are code blocks.
                const isCode = editor.value.blocks.some(block => block.type === 'code')

                // Otherwise, set the currently selected blocks type to "code"..
                // Toggle the block type depending on `isCode`.
                editor.setBlocks(isCode ? 'paragraph' :'code')
                break
            }
            case 'i': {
                console.log("==italic==")
                event.preventDefault();
                editor.addMark('italic')
                break
            }

            default :
                return next()
        }
        return true
    }

    // Add a `renderNode` method to render a `CodeNode` for code blocks.
    renderNode = (props, editor, next) => {
        // console.log("==renderNode props==", props)
        // console.log("==renderNode editor==", editor)
        // console.log("==renderNode next==", next)
        switch (props.node.type) {
            case 'code':
                return <CodeNode {...props} />
            default:
                return next()
        }
    }

    renderMark = (props, editor, next) => {

        // console.log("==renderNode props==", props)
        // console.log("==renderNode editor==", editor)
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
            default:
                return next()
        }

    }

    render() {
        return (
            <div >
                <h1>FirstEditor</h1>
                <Editor value={this.state.value}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        renderNode={this.renderNode}
                        renderMark={this.renderMark}
                />

            </div>
        );
    }
}

export default FirstEditor;
