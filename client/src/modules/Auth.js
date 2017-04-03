import React from 'react'; 

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