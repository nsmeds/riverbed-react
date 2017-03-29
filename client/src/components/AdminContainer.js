import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import Signin from './Signin';
import Admin from './Admin';

class AdminContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAuthors();
        this.props.getIssues();
    }


    render() {
        return (
            <div>
                {(Auth.isAuthenticated) ? <Admin {...this.props}></Admin> : <Signin {...this.props}></Signin> }
            </div>
        );
    }
}

export default AdminContainer;