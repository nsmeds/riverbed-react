import React, { Component } from 'react';
import Signin from './Signin';
import Admin from './Admin';

class AdminContainer extends Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.checkToken();
        this.props.getAuthors();
        this.props.getIssues();
    }

    render() {
        return (
            <div>
                {this.props.isLoggedIn ? <Admin {...this.props}></Admin> : <Signin {...this.props}></Signin> }
            </div>
        );
    }
}

export default AdminContainer;