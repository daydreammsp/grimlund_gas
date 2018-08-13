import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button, Grid, Row, Col, Panel, DropdownButton, MenuItem  } from 'react-bootstrap';
import '../ChangeCar/ChangeCar.css';




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
    
      
    changeCar = (car) => {
        console.log(car)
        this.props.dispatch({
            type: 'CURRENT_CAR_CHANGE',
            payload: {carId:car.id,
                     userId: this.props.user.userId,
                    currentCar: this.state.currentCar}
        })
    }

    render() {
        
        this.state.userCars = this.props.driverId && this.props.driverId.map( (car)=>{
            return(
                
                <MenuItem eventKey={car.id}
                onClick={()=>this.changeCar(car)}
                ><span>{car.car_model} </span> {car.car_year}</MenuItem>
                
               
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
      bsStyle={'default'}
      title="Right dropup"
      dropup
      pullRight
    >
    {this.state.userCars}
    {/* {this.state.userCars} */}
      {/* <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3">
        Active Item
      </MenuItem>
      <MenuItem divider /> */}
      {/* <MenuItem eventKey="4">Separated link</MenuItem> */}
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