import React from 'react';

const Signin = props => {

    // console.log('props from Signin', props);

    let newUser = {
        username: props.username,
        password: props.password
    }

    return (
        <form className="form" onSubmit={props.handleLogin}>
            <label>
                <span>Username: </span>
                <input type="text" name="username" value={newUser.username} onChange={props.handleInputChange} />
            </label>
            <label>
                <span>Password: </span>
                <input type="password" name="password" value={newUser.password} onChange={props.handleInputChange} />
            </label>
            <button className="button">Log In</button>
        </form>
    )
}

export default Signin;