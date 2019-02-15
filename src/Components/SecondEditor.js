import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import Html from 'slate-html-serializer';

const rules = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'block',
                    type: type,
                    data: {
                        className: el.getAttribute('class'),
                    },
                    nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object === 'block') {
                switch (obj.type) {
                    case 'code':
                        return (
                            <pre>
                <code>{children}</code>
              </pre>
                        )
                    case 'paragraph':
                        return <p className={obj.data.get('className')}>{children}</p>
                    case 'quote':
                        return <blockquote>{children}</blockquote>
                }
            }
        },
    },
    // Add a new rule that handles marks...
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'mark',
                    type: type,
                    nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object === 'mark') {
                switch (obj.type) {
                    case 'bold':
                        return <strong>{children}</strong>
                    case 'italic':
                        return <em>{children}</em>
                    case 'underline':
                        return <u>{children}</u>
                }
            }
        },
    },
]

const html = new Html({ rules })
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

// Refactor block tags into a dictionary for cleanliness.
const BLOCK_TAGS = {
    blockquote: 'quote',
    p: 'paragraph',
    pre: 'code',
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underline',
}


function MarkHotkey(options) {
    // Grab our options from the ones passed in.
    const { type, key } = options
    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key !== key) return next()

            // Prevent the default characters from being inserted.
            event.preventDefault()

            // Toggle the mark `type`.
            editor.toggleMark(type)
        },
    }
}

// const boldPlugin = MarkHotkey({
//     type: 'bold',
//     key: 'b',
// })
const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: '`', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '~', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' }),
]


class SecondEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: initialValue,
        }
    }

    componentDidMount(){
        console.log("==componentDidMount==")

        const existingValue = localStorage.getItem('content') || '<p></p>'
        console.log("==existingValue==", existingValue)

        // const initialValue = Plain.deserialize(
        //     existingValue || 'A string of plain text.'
        // )
        // console.log("==initialValue==", initialValue)

        this.setState({
            value: html.deserialize(existingValue)
        })
    }

    onChange = ({ value }) => {

        if (value.document !== this.state.value.document) {

            // const content = html.serialize(value)
            const content = html.serialize(value)
            console.log("==content==", content)
            localStorage.setItem('content', content )
        }
        this.setState({ value })
    }

    // Add a `renderMark` method to render marks.
    renderMark = (props, editor, next) => {
        const { mark, attributes } = props
        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{props.children}</strong>
            case 'italic':
                return <em {...attributes}>{props.children}</em>
            case 'underline':
                return <u {...attributes}>{props.children}</u>
            default:
                return next()
        }
    }

    // renderMark = (props, editor, next) => {
    //
    //     switch (props.mark.type) {
    //
    //         case 'bold':
    //             return <strong >{props.children}</strong>
    //         case 'code':
    //             return <code>{props.children}</code>
    //         case 'italic':
    //             return <em>{props.children}</em>
    //         case 'strikethrough':
    //             return <del>{props.children}</del>
    //         case 'underline':
    //             return <u>{props.children}</u>
    //         default:
    //             return next()
    //     }
    // }

    handleSaveData = () => {
        console.log("==handleSaveData=")
    }
    handleLoadData = () => {
        console.log("==handleLoadData=")
        const contentFromLocalStorage = localStorage.getItem('content')
        const constentObject = JSON.parse(contentFromLocalStorage)
        console.log("==constentObject==", constentObject)
        console.log("==contentFromLocalStorage==", contentFromLocalStorage)
        // this.setState({
        //     value: constentObject,
        // })
        this.setState({
            value: constentObject
        })
    }

    renderNode = (props, editor, next) => {
        switch (props.node.type) {
            case 'code':
                return (
                    <pre {...props.attributes}>
            <code>{props.children}</code>
          </pre>
                )
            case 'paragraph':
                return (
                    <p {...props.attributes} className={props.node.data.get('className')}>
                        {props.children}
                    </p>
                )
            case 'quote':
                return <blockquote {...props.attributes}>{props.children}</blockquote>
            default:
                return next()
        }
    }

    render() {
        return (
            <div className="App">
                <h1>SecondEditor</h1>
                <div className="editor-box">
                    <Editor
                        plugins={plugins}
                        value={this.state.value}
                        onChange={this.onChange}
                        renderMark={this.renderMark}
                        renderNode={this.renderNode}
                    />

                </div>
                <div>
                    <button onClick={this.handleSaveData}>Save</button>
                    <button onClick={this.handleLoadData}>Load</button>
                </div>

            </div>
        );
    }
}

export default SecondEditor;
