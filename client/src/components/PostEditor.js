import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Editor } from 'draft-js';

class PostEditor extends Component {

    render() {
        
        // console.log('props from PostEditor', this.props);
        const { editorState, onChange } = this.props;

        return (
            <div id="content" style={{ background: 'white', color: 'black' }} >
                <div className="editor">
                    <Editor editorState={editorState} onChange={onChange} />
                </div>
            </div>
        )
    }

}
export default PostEditor;