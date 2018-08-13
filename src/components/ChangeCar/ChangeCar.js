import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button, Grid, Row, Col, Panel, DropdownButton, MenuItem  } from 'react-bootstrap';
import '../CurrentUserInfo/CurrentUserInfo.css';




const mapStateToProps = state => ({
    user: state.user,
    driverId: state.driverIdGetReducer,
    cars: state.carsGetReducer
  });

class CurrentUserInfo extends Component {
    state={
    userCars:[],
    currentCar:[]
    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        
      }
    
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
        
      }
     
    
      render() {
        
        this.state.userCars = this.props.driverId && this.props.driverId.map( (car)=>{
            return(
                {carId: car.id,
                  carCurrent: car.current_car,
                carModel: car.car_model, 
                carMake: car.car_make,
                carYear: car.car_year}
            )
        });
     
          let sortCars = (car => car.carCurrent === "true");
           let currentCar = this.state.userCars && this.state.userCars.filter(sortCars);
          this.state.currentCar = currentCar
        
        
        let content = null;
    
        if (this.props.user.userName && this.state.currentCar) {
          
          content = (
              
            <div>
            <DropdownButton
    //   bsStyle={title.toLowerCase()}
      title="Your Cars"
      key='1'
      id={`dropdown-basic-`}
    >
      {/* <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3">
        Active Item
      </MenuItem> */}
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
            {this.state.userCars[0].carMake}
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
    export default connect(mapStateToProps)(CurrentUserInfo);