import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Button, Grid, Row, Col, Panel  } from 'react-bootstrap';
import '../NavPage/NavPage.css';

const mapStateToProps = state => ({
    user: state.user,
    driverId: state.driverIdGetReducer,
    cars: state.carsGetReducer
  });
class NavPage extends Component {
    state={
    open: false,
    open1: false,
    open2: false,
    open3: false,
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
    
      render() {
        
        
        let content = null;
    
        if (this.props.user.userName) {
          content = (
            <div>
              
              <Grid className="centered">
  <Row >
  {!this.state.open1 &&
    <Col xs={12}>
    
        <Button onClick={() => this.setState({ open: !this.state.open, open2: !this.state.open2, open3: !this.state.open3})}>
          Click to toggle 1
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.open}>
          <Panel.Collapse>
            <Panel.Body>
                b1
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
    </Col>
  }
  </Row>
  {!this.state.open2 &&
  <Row>
    <Col xs={12}>
    <Button onClick={() => this.setState({ open21: !this.state.open21, open1: !this.state.open1, open3: !this.state.open3})}>
          Click to toggle 2
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.open21}>
          <Panel.Collapse>
            <Panel.Body>
                b2
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
    </Col>
  </Row>
  }
  {!this.state.open3 &&
    <Row>
    <Col xs={12}>
    <Button onClick={() => this.setState({ open31: !this.state.open31, open2: !this.state.open2, open1: !this.state.open1})}>
          Click to toggle 3
        </Button>
        <br />
        <Panel id="collapsible-panel-example-1" expanded={this.state.open31}>
          <Panel.Collapse>
            <Panel.Body>b3
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
    </Col>
  </Row>
  }
  
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