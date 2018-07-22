import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Button from 'react-bootstrap/lib/Button';
import AddNewCar from './AddNewCar/AddNewCar';

const mapStateToProps = state => ({
  user: state.user,
  driverId: state.driverIdGetReducer
});

class UserPage extends Component {
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
      payload: {driver_id: 4,
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
      gallons_purchased: ''
    })
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    
    
    
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

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <h3>Transaction</h3>
          <input
          placeholder="city"
          onChange={this.transactionInput('city')}
          />
          <input
          placeholder="state"
          onChange={this.transactionInput('state')}
          />
          <input
          placeholder="milage"
          onChange={this.transactionInput('milage')}
          />
          <input
          placeholder="gallons_purchased"
          onChange={this.transactionInput('gallons_purchased')}
          />
          <input
          placeholder="Price Per Gallon"
          onChange={this.transactionInput('gallonPrice')}
          />
          <Button
          onClick={this.transactionSubmit}
          >
            Submit
            </Button>
          <AddNewCar/>
          <Button
            onClick={this.logout}
          >
            Log Out
          </Button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

