// Libs
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Components
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Admin from './components/Admin';
import Contact from './components/Contact';
import Signin from './components/Signin';
import Unfound from './components/Unfound';

// Anchor link functionality
function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}

// Routes
const routes = (
    <Router onUpdate={hashLinkScroll}>
        <Route component={App}>
            <Route path="/" component={Home} />
            <Route path="about" component={About} />
            <Route path="admin" component={Admin} />
            <Route path="contact" component={Contact} />
            <Route path="signin" component={Signin} />
            <Route path="*" component={Unfound} />
        </Route>
    </Router>
);

export default routes;