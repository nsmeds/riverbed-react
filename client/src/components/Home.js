import React, { Component } from 'react';
import Contributors from './Contributors';

class Home extends Component {
    render() {
        return (
            <div>
                {/*<Contributors data={this.state.posts} />*/}
                {this.props.children}
            </div>
        );
    }
}

export default Home;