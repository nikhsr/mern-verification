import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
class Home extends Component {
  render() {
    return (
      <Alert variant='success'>
        <div className='container'>
          <p>Hello there</p>
        </div>
      </Alert>
    );
  }
}

export default connect()(Home);
