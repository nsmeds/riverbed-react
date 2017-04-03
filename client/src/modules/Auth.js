import React from 'react';
import axios from 'axios';

class Auth {
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static deauthenticate() {
        localStorage.removeItem('token');
    }

    static isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}

export default Auth;