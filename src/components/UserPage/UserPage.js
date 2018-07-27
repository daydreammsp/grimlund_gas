import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Button from 'react-bootstrap/lib/Button';
import AddNewCar from './AddNewCar/AddNewCar';
import Transaction from './Transaction/Transaction';

const mapStateToProps = state => ({
  user: state.user,
  driverId: state.driverIdGetReducer,
  cars: state.carsGetReducer
});

class UserPage extends Component {
  state={
    
  }
  
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({
      type: "CAR_GET"
    })
    
    
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
    
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let cars = this.props.cars.map( (car)=>{
      return(
        <h3 key={car.id}>{car.car_model}</h3>
      )
    });
    
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <Transaction/>
          <AddNewCar/>
          {cars}
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

