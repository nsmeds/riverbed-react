import React, { Component } from 'react';
import { Editor } from 'draft-js';

class PostEditor extends Component {

    render() {
        
        const { editorState, onChange, handleKeyCommand } = this.props;
        this.focus = () => this.refs.editor.focus();

        return (
            <div id="content">
                <div className="editor" onClick={this.focus}>
                    {/*<button onClick={_onBoldClick}>Bold</button>*/}
                    <Editor editorState={editorState} onChange={onChange} handleKeyCommand={handleKeyCommand} ref="editor" />
                </div>
            </div>
        )
    }

}
export default PostEditor;