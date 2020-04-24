import React, { Component } from 'react';
import { connect } from 'react-redux';
class Home extends Component {
  render() {
    return (
      <div className='container'>
        <p>Hello there,</p>
      </div>
    );
  }
}

export default connect()(Home);
