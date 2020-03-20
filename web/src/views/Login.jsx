import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import '../assets/css/login.css';

const config = require('../config.json');
const IP = config['IP'];
const PORT = config['PORT'];
const CONTEXT_PATH = config['CONTEXT-PATH'];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    }
  }

  onLogInPress() {
    // const email = this.state.email;
    // const password = this.state.password;

    axios
      .post(`http://${IP}:${PORT}${CONTEXT_PATH}/users/login`, {
        email: this.state.email,
        password: this.state.password
      }).then((response) => {
        // console.log("response:" + JSON.stringify(response));
        // console.log("userId:" + response.headers.userid);
        // console.log("Authorization:" + response.headers.authorization );
        const userId = response.headers.userid;
        const jwt = response.headers.authorization;

        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('jwt', jwt);
        this.props.history.push('/admin/dashboard');
      }).catch((err) => {
        this.setState({ errorMessage: "Admin login error \nIncorrect email or password" });
        console.log("Admin login error, incorrect email or password", err);
      });

  }

  render() {
    //const { handleSubmit } = this.props;
    return (
      <div id="bg">
        <div id="bgoverlay">
          <center>
            <form className="form">
              <div>
                <FormGroup component="FormControl">
                  <ControlLabel id="controlLabel">Email</ControlLabel>
                  <FormControl
                    type="text"
                    onChange={(event) => {
                      this.setState({ email: event.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup component="FormControl">
                  <ControlLabel id="controlLabel">Password</ControlLabel>
                  <FormControl
                    type="password"
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                    }}
                  />
                </FormGroup>
              </div>
              <div id="errorStyle"><p style={{fontSize: "20px", fontWeight: "bold"}}>{this.state.errorMessage}</p></div>

              <Button variant="contained" color="primary" style={{fontSize: '130%'}} fullWidth={true}
                      onClick={() => this.onLogInPress()}>
                Log In
              </Button>

            </form>
          </center>
        </div>
      </div>
    );
  }
}

export default Login;