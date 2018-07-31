import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { Button, Grid, Row, Col, Panel  } from 'react-bootstrap';
import '../CurrentUserInfo/CurrentUserInfo.css';



const mapStateToProps = state => ({
    user: state.user,
    driverId: state.driverIdGetReducer,
    cars: state.carsGetReducer
  });

class CurrentUserInfo extends Component {
    state={
    userCars:[]
    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        
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
    // userCarSort = () => {
    //     let sortCars = (car => car.driver_id === this.props.user.user_id );
    //     this.state.userCars = 
    // }
      render() {
        let userCars = this.props.driverId.map( (car)=>{
            return(
                car
            )
        })
        let content = null;
    
        if (this.props.user.userName) {
          content = (
              
            <div>
             {this.props.user.userName}
             
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