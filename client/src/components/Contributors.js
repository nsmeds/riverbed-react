import React from 'react';
// import Contributor from './Contributor';
import { Link } from 'react-router';


const Contributors = props => {
    let results = props.data;
    let contributors = results.map(contributor => 
        // <Contributor name={contributor.author.name} key={contributor._id} />
        <Link to={`#${contributor._id}`} key={contributor._id}>
            <li key={contributor._id} id={contributor._id}>
                {contributor.author.name}
            </li>
        </Link>
    );

    return (
        <div id="issue-desc" className="bg-blend">
            <span>New Writing By</span>
            <ul id="contributors" className="nav-ul">
                {contributors}
            </ul>
        </div>
    );
}

export default Contributors;