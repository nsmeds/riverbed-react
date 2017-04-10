// ** This component is not currently used **

import React from 'react';

const IssueList = props => {

    let issueList = props.issues.map(issue => 
        <option key={issue._id} value={issue._id}>{issue.title}</option>
    );

    return (
           {issueList}
        )

}

export default IssueList;