import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import '../assets/css/login.css';
import { isJSDocFunctionType } from "typescript";
import { Container } from "@material-ui/core";
import { compose } from "@material-ui/system";

// const config = require('../config.json');
// const HOST = config['HOST'];
// const PORT = config['PORT'];
// const CONTEXT_PATH = config['CONTEXT-PATH'];
require('dotenv').config();
const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_HOST_PORT;
const CONTEXT_PATH = process.env.REACT_APP_CONTEXT_PATH;


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
    console.log("host" + HOST);
    console.log("PORT" + PORT);
    console.log("CONTEXT_PATH" + CONTEXT_PATH);


    axios
      .post(`http://${HOST}:${PORT}${CONTEXT_PATH}/users/login`, {
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



// travis test spb junit

// test:
// if we dont mysql docker Container
// not be able able run test
// docker compose
// mvn junit test
// create another docker file: mvn images, run build/test

// docker build images