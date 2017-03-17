import React from 'react';

const NewIssue = props => {

    let newTitle;

    return (
        <div id="add-issue" className="sub-form">
            <h5>New Issue</h5>
            <label><span>Date:</span>
                <input type="text" name="issue" value={newTitle} onChange={props.handleInputChange}/>
            </label>
            <button className="button" onClick={props.handleAddIssue}>Add</button>
        </div>
    )
}

export default NewIssue;