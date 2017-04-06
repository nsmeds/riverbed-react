import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Editor, EditorState, convertToRaw } from 'draft-js';

class PostEditor extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         editorState: EditorState.createEmpty()
    //     };
    //     this.rawdata;
    //     this.onChange = this.onChange.bind(this);
    // }
    
    // onChange (editorState) {
    //     this.setState({editorState});
    //     this.rawdata = convertToRaw(this.state.editorState.getCurrentContent());
    // } 

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