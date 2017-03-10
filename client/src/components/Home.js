import React from 'react';
import Contributors from './Contributors';
import MainContent from './MainContent';


// maybe just make this a class and use componentDidMount to grab the current issue every time, I guess.

const Home = props => {

  console.log('props from Home', props);

  return (
    <div>
      <Contributors {...props}/>
      <MainContent {...props}/>
    </div>
  )
}


export default Home;