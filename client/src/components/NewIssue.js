import React from 'react';

const NewIssue = props => {

    let newTitle;

    return (
        <div id="add-issue" className="sub-form">
            <div>New Issue</div>
            <label>Issue Date: 
                <input type="text" name="issue" value={newTitle} onChange={props.handleInputChange}/>
            </label>
            <button className="button" onClick={props.handleAddIssue}>Add</button>
        </div>
    )
}

export default NewIssue;