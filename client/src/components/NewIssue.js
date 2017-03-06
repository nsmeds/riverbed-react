import React from 'react';

const NewIssue = props => {

    //handleSubmit and pass props just like in the other form

    return (
        <form className="sub-form">
            <label>Issue Date: 
                <input type="text" name="title" value={props.title} />
            </label>
            <button className="button">Add</button>
        </form>
    )
}

export default NewIssue;