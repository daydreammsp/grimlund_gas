import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Geolocation from 'react-geolocation';
import MapContainer from '../../GoogleMap/GoogleMap';

const mapStateToProps = state => ({
  user: state.user,
    driverId: state.driverIdGetReducer,
    cars: state.carsGetReducer
});

class Transaction extends Component {
  state={
    city:'',
    state:'',
    milage:'',
    gallonPrice: '',
    gallons_purchased:'',
    currentCar: []
  }
  
  transactionInput = (inputText) => {
    return (event) => {
      this.setState({
        [inputText]: event.target.value
      });
    }
  }
  transactionSubmit = (currentCar) => { 
    
    this.props.dispatch({
      type: 'TRANSACTION_POST',
      payload: {car_id:currentCar,
                city:this.state.city,
                state:this.state.state,
                milage:this.state.milage,
                gallonPrice:this.state.gallonPrice,
                gallons_purchased:this.state.gallons_purchased,
                }
    });
    this.setState({
      city: '',
      state: '',
      milage: '',
      gallonPrice:'',
      gallons_purchased:'',
      currentCar: []
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
    let userCars = this.props.driverId && this.props.driverId.map( (car)=>{
      return(
          car
      )
  });
  
    let sortCars = (car => car.current_car === "true");
     let currentCar = userCars && userCars.filter(sortCars);

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
          value={this.state.gallons_purchased}
          placeholder="gallons_purchased"
          onChange={this.transactionInput('gallons_purchased')}
          />
          <input
          value={this.state.gallonPrice}
          placeholder="Price Per Gallon"
          onChange={this.transactionInput('gallonPrice')}
          />
          <Button
          onClick={()=>this.transactionSubmit(currentCar[0].car_id)}
          >
            Submit
            </Button>
            <Geolocation
    render={({
      fetchingPosition,
      position: { coords: { latitude, longitude } = {} } = {},
      error,
      getCurrentPosition
    }) =>
      <div>
        <button onClick={getCurrentPosition}>Get Position</button>
        {error &&
          <div>
            {error.message}
          </div>}
        <pre>
          latitude: {latitude}
          longitude: {longitude}
        </pre>
      </div>}
  />
  <MapContainer />
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

