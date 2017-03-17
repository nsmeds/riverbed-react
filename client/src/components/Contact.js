import React from 'react';

const Contact = props => {
    return (
        <div className="menu-item">
            <h2>Contact Us</h2>
            <p className="description-paragraph">If you'd like to drop us a note about the magazine, website or anything else, you can do so below. If you'd like to contribute work for publication, <a href="#">email us</a>. Preferred format is pdf, or paste your work in the body of the email.</p>
            <form className='form'>
                <input type='name' placeholder='Your name' name='name' />
                <input type='email' placeholder='Your email' name='email' />
                <textarea name='message' placeholder='Your message' />
                <button className="button">Submit</button>
            </form>
        </div>
    );
}


export default Contact;