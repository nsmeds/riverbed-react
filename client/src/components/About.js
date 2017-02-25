import React, { Component } from 'react';
import { Link } from 'react-router';

class About extends Component {
    render() {
        return (
            <div className="menu-item">
                <h2>About Riverbed</h2>
                <p>Riverbed is a poetry magazine of the online realm. We are currently hard at work building our first issue. To be notified when it is published, enter your email below. If you'd like to contribute work for publication, <a href="#">email us</a>. Preferred format is pdf, or paste your work in the body of the email.</p>

                <form className="form">
                    <input type='email' placeholder='Your email' name='email' />>
                    <button className="button">Submit</button>
                </form>
            </div>
        );
    }
}

export default About;

