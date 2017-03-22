import React from 'react';

const Signin = props => {

// TODO: make this functional

    console.log('props from Signin', props);

    let user = {
        username: props.user.username,
        password: props.user.password
    }

    return (
        <form className="form" onSubmit={props.handleLogin.bind(this)}>
            <label>
                <span>Username: </span>
                <input type="text" name="username" value={user.username} onChange={props.handleInputChange} />
            </label>
            <label>
                <span>Password: </span>
                <input type="text" name="password" value={user.password} onChange={props.handleInputChange} />
            </label>
            <button className="button">Log In</button>
        </form>
    )
}

export default Signin;