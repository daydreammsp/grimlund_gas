import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Button, Grid, Row, Col, Panel  } from 'react-bootstrap';
import '../NavPage/NavPage.css';
import Transaction from '../UserPage/Transaction/Transaction';
import AddNewCar from '../UserPage/AddNewCar/AddNewCar';
import Reporting from '../Reporting/Reporting';
import CurrentUserInfo from '../CurrentUserInfo/CurrentUserInfo';
import ChangeCar from '../ChangeCar/ChangeCar';


const mapStateToProps = state => ({
    user: state.user,
    driverId: state.driverIdGetReducer,
    cars: state.carsGetReducer,
    toggleInfo: state.toggleInfoReducer
  });

class NavPage extends Component {
    state={
    open: false,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open21: false,
    
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
      // open21: !this.state.open21, open1: !this.state.open1, open3: !this.state.open3, open4: !this.state.open4
      toggleMenu = (a1,b1,a2,b2,a3,b3,a4,b4)=>{
        this.setState({[a1]: b1, 
                      [a2]: b2,
                      [a3]: b3,
                      [a4]: b4})
          this.cardis()
          
      }
      cardis =()=>{
        this.props.dispatch({
            type: "DRIVER_GET",
            payload: {driver: this.props.user.userId}
          })
      }  

      
      render() {
        
        let navBorder = "navBorder"
        let centered = "centered"
        if(this.state.open || this.state.open21 || this.state.open31 || this.state.open41){
          navBorder = "navBorderOpen"
          centered = "centeredClicked"
        }
        
        let content = null;
    
        if (this.props.user.userName) {
          content = (
              
            <div>
              
              <Grid className={navBorder}>
              <div className={centered}>
              <CurrentUserInfo/>
  <Row>
  {!this.state.open1 &&
    <Col sm={12}>
    
        <Button className="btn" bsSize="small" block 
        onClick={()=>this.toggleMenu("open",!this.state.open, 
                                    "open2", !this.state.open2, 
                                    "open3", !this.state.open3,
                                    "open4",!this.state.open4)}>
         Cars
              
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.open}>
          <Panel.Collapse>
            <Panel.Body>
           
              <AddNewCar />
              <ChangeCar/>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
    </Col>
  }
  </Row>
  {!this.state.open2 &&
  <Row >
    <Col xs={12}>
    <Button  bsSize="small" block 
    onClick={()=>this.toggleMenu( "open21", !this.state.open21, 
                                  "open1", !this.state.open1, 
                                  "open3", !this.state.open3, 
                                  "open4", !this.state.open4)}>
          Transaction
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.open21}>
          <Panel.Collapse>
            <Panel.Body>
              
              <Transaction/>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
    </Col>
  </Row>
  }
  {!this.state.open4 &&
  <Row >
    <Col xs={12}>
    <Button  bsSize="small" block 
            onClick={()=>this.toggleMenu( "open41", !this.state.open41, 
                                          "open1",!this.state.open1, 
                                          "open3", !this.state.open3, 
                                          "open2", !this.state.open2)}>
          Reporting
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.open41}>
          <Panel.Collapse>
            <Panel.Body>
                
              <Reporting/>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
    </Col>
  </Row>
  }
  {!this.state.open3 &&
    <Row >
    <Col xs={12}>
    <Button  bsSize="small" block 
              onClick={()=>this.toggleMenu( "open31", !this.state.open31,
                                             "open2", !this.state.open2, 
                                             "open1", !this.state.open1, 
                                             "open4", !this.state.open4)}>
            Log Out
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.open31}>
          <Panel.Collapse>
            <Panel.Body>
            <Button
            onClick={this.logout}
          >
            Log Out
          </Button>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
    </Col>
  </Row>
  }
  </div>
</Grid>

             
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
    export default connect(mapStateToProps)(NavPage);