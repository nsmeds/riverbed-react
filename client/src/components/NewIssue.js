import React from 'react';
import axios from 'axios';

const NewIssue = props => {

    let newTitle;
    // function handleAddIssue(event) {
    //     event.preventDefault();
    //     axios.post('http://localhost:3001/api/issues', {
    //         title: newTitle,
    //     })
    //     .then(response => {
    //         console.log('Successful POST to /issues: ', response);
    //     })
    //     .catch(error => {
    //         console.log('Could not POST to /issues: ', error)
    //     })
    // }

    // function handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.value;
    //     newTitle = value;
    // }

    // console.log('props from NewIssue', props);

    return (
        <div id="add-issue" className="form sub-form">
            <div>New Issue</div>
            <label>Issue Date: 
                <input type="text" name="issue" value={newTitle} onChange={props.handleInputChange}/>
            </label>
            <button className="button" onClick={props.handleAddIssue}>Add</button>
        </div>
    )
}

export default NewIssue;