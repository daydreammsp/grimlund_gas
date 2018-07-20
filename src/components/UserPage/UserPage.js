import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Button from 'react-bootstrap/lib/Button';

const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
  state={
    model:'',
    make:'',
    year:'',
    miles:''
  }
  carInput = (inputText) => {
    return (event) => {
      this.setState({
        [inputText]: event.target.value
      });
    }
  }
  carSubmit = ()=>{
    this.props.dispatch({
      type: 'CAR_POST',
      payload: {model:this.state.model,
                make:this.state.make,
                year:this.state.year,
                miles:this.state.miles}
    });
    // this.setState({
    //   model: '',
    //   make: '',
    //   year: '',
    //   miles: ''
    // })
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
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <h3>car</h3>
          <input 
          placeholder="model"
          onChange={this.carInput('model')}
          />
          <input 
          placeholder="make"
          onChange={this.carInput('make')}
          />
          <input 
          placeholder="year"
          onChange={this.carInput('year')}
          />
          <input 
          placeholder="starting miles"
          onChange={this.carInput('miles')}
          />
          <Button
          onClick={this.carSubmit}
          >submit</Button>

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

