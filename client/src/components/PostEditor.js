import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';

class PostEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = (editorState) => this.setState({editorState});
    }

    render() {
        return (
            <div id="content">
                <div className="editor">
                    <Editor editorState={this.state.editorState} onChange={this.onChange} />
                </div>
            </div>
        )
    }

}


export default PostEditor;