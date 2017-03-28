import React from 'react';
import Contributors from './Contributors';
import MainContent from './MainContent';


// maybe just make this a class and use componentDidMount to grab the current issue every time, I guess.

const Home = props => {

  console.log('props from Home', props);

  return (
    <div>
      {/*<Contributors {...props}/>*/}
      {/*<MainContent {...props}/>*/}
    </div>
  )
}

// class Home extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//         currentIssue: {
//           posts: this.props.currentIssue.posts
//         },
//         key: this.props.key
//     }
//     console.log('props.currentIssue from Home', props.currentIssue);

//   }
  // componentWillReceiveProps(nextProps) {
  //   this.renderProps(nextProps);
  // }

  // renderProps(props) {
  //   this.setState({
  //     currentIssue: {
  //       posts: this.props.currentIssue.posts
  //     }
  //   })
  // }

  // componentWillMount() {
  //   this.forceUpdate();

  // }
  // componentWillMount() {
  //   // this.props.forceUpdate();
  //   this.props.getCurrentIssue();
  // }
  // componentWillReceiveProps(nextProps) {
  //   this.setState(
  //     this.props = nextProps
  //   )
  // }

  /*render() {

    return (
      <div>
        <Contributors {...this.props} />
        <MainContent {...this.props}/>
      </div>
    )
  }
}*/

export default Home;