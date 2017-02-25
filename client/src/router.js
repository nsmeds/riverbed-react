// Libs
import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

// Components
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Admin from './components/Admin';
import Contact from './components/Contact';

// Routes
const routes = (
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/" component={Home} />
            <Route path="home" component={Home} />
            <Route path="about" component={About} />
            <Route path="admin" component={Admin} />
            <Route path="contact" component={Contact} />
        </Route>
    </Router>
);

export default routes;