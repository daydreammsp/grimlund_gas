import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';

const mapStateToProps = state => ({
  user: state.user
});

class Reporting extends Component {
  state={
    
  }
  
  componentDidMount() {
    
    
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }


  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          
         <h2>Reporting</h2>
        </div>
      );
    }

    return (
      <div>
       
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Reporting);

