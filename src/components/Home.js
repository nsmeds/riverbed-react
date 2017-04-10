import React from 'react';
import Contributors from './Contributors';
import MainContent from './MainContent';

const Home = props => {

    return (
        <div>
            <Contributors {...props}/>
            <MainContent {...props}/>
        </div>
        )
    }

export default Home;