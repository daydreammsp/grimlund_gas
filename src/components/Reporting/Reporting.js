import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';

const mapStateToProps = state => ({
  user: state.user
});

class Reporting extends Component {
  state={
    model:'',
    make:'',
    year:'',
    miles:''
  }
  carInput = (inputText) => {
    return (event) => {
      this.setState({
        [inputText]: event.target.value
      });
    }
  }
  carSubmit = ()=>{
    this.props.dispatch({
      type: 'CAR_POST',
      payload: {model:this.state.model,
                make:this.state.make,
                year:this.state.year,
                miles:this.state.miles,
                userId:this.props.user.userId}
    });
    this.setState({
      model: '',
      make: '',
      year: '',
      miles: ''
    })
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
          
          <h3> add new car</h3>
          <input 
          value={this.state.model}
          placeholder="model"
          onChange={this.carInput('model')}
          />
          <input 
           value={this.state.make}
          placeholder="make"
          onChange={this.carInput('make')}
          />
          <input 
          value={this.state.year}
          placeholder="year"
          onChange={this.carInput('year')}
          />
          <input 
          value={this.state.miles}
          placeholder="starting miles"
          onChange={this.carInput('miles')}
          />
          <Button
          onClick={this.carSubmit}
          >submit</Button>
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

