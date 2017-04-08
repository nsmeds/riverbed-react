import React from 'react';

const About = props => {
    return (
        <div className="menu-item">
            <h2>About Riverbed</h2>
            <blockquote className="blockquote">"To the (person) who is seeking the sanction of life in poetry, the namby-pamby is an intolerable dissipation." - Wallace Stevens</blockquote>
            <p>RIVERBED is an online journal of poetry, intended to provide a venue for voices that take risks, are unafraid of stillness, and stand their ground amidst the fray. 
            <br /><br />
            We are currently hard at work building our first issue.
            To be notified when it is published, or if you'd like to contribute work for publication, <a href="mailto:riverbed@riverbedpoetry.com">email us</a>. Preferred format is pdf, or paste your work in the body of the email.</p>

            {/*<form className="form">
                <input type='email' placeholder='Your email' name='email' />
                <button className="button">Submit</button>
            </form>*/}
        </div>
    );
}

export default About;

