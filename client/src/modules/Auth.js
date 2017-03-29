import React from 'react';

class Auth {
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticate() {
        localStorage.removeItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}

export default Auth;