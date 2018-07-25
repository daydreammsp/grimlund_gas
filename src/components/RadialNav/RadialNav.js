import React, { Component } from 'react';
import { connect } from 'react-redux';
import  ReactRadial  from 'react-radial';


const mapStateToProps = state => ({
  user: state.user
});



class RadialNav extends Component {
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
          <ReactRadial />
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
export default connect(mapStateToProps)(RadialNav);

