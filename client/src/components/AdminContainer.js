import React, { Component } from 'react';
import axios from 'axios';
import Signin from './Signin';

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
            <Signin {...this.props}></Signin>
        );
    }
}

export default AdminContainer;