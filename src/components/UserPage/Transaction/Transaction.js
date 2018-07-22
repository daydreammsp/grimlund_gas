import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';


const mapStateToProps = state => ({
  user: state.user,
  driverId: state.driverIdGetReducer
});

class Transaction extends Component {
  state={
    city:'',
    state:'',
    milage:'',
    gallonPrice: '',
    gallons_purchased:''
  }
  transactionInput = (inputText) => {
    return (event) => {
      this.setState({
        [inputText]: event.target.value
      });
    }
  }
  transactionSubmit = () => { 
    this.props.dispatch({
      type: 'TRANSACTION_POST',
      payload: {driver_id: this.props.driverId[0].id,
                city:this.state.city,
                state:this.state.state,
                milage:this.state.milage,
                gallonPrice:this.state.gallonPrice,
                gallons_purchased:this.state.gallons_purchased,
                userId:this.props.user.userId}
    });
    this.setState({
      city: '',
      state: '',
      milage: '',
      gallonPrice:'',
      gallons_purchased: ''
    })
  }
  componentDidMount() {
    
    
    
    
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
    if(this.props.user.userId && this.props.driverId === false){
      this.props.dispatch({
        type: "DRIVER_GET",
        payload: {driver: this.props.user.userId}
      })
    }
  }

  

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h3>Transaction</h3>
          <input
          value={this.state.city}
          placeholder="city"
          onChange={this.transactionInput('city')}
          />
          <input
          value={this.state.state}
          placeholder="state"
          onChange={this.transactionInput('state')}
          />
          <input
          value={this.state.milage}
          placeholder="milage"
          onChange={this.transactionInput('milage')}
          />
          <input
          value={this.state.gallons_purchase}
          placeholder="gallons_purchased"
          onChange={this.transactionInput('gallons_purchased')}
          />
          <input
          value={this.state.gallonPrice}
          placeholder="Price Per Gallon"
          onChange={this.transactionInput('gallonPrice')}
          />
          <Button
          onClick={this.transactionSubmit}
          >
            Submit
            </Button>
          
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
export default connect(mapStateToProps)(Transaction);

