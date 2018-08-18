import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button, Grid, Row, Col, Panel, DropdownButton, MenuItem  } from 'react-bootstrap';
import '../ChangeCar/ChangeCar.css';

let carChangeDiv= "carChange"

const mapStateToProps = state => ({
    user: state.user,
    driverId: state.driverIdGetReducer,
    cars: state.carsGetReducer
  });

class ChangeCar extends Component {
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
                    currentCar: this.state.currentCar,
                userId: this.props.user.userId}
        })
        this.updateList()
          carChangeDiv = "carChangeClicked"
    }
    updateList=()=>{
        this.props.dispatch({
            type: "DRIVER_GET",
            payload: {driver: this.props.user.userId}
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
     
        
        
        let content = null;
    
        if (this.props.user.userName && this.state.currentCar) {
          
          content = (
              
            <div className={carChangeDiv}>
                
            <DropdownButton
      bsStyle={'default'}
      title="Available Cars"
      
      pullRight
    >
    {this.state.userCars}
    
    </DropdownButton>
    {/* <h4>{currentCar}</h4> */}
    
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
    export default connect(mapStateToProps)(ChangeCar);