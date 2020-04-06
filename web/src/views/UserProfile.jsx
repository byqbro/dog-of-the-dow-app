import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import avatar from "assets/img/faces/face-3.jpg";
import logo from "assets/img/faces/logo.png";
import axios from 'axios';

require('dotenv').config();
const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_HOST_PORT;
const CONTEXT_PATH = process.env.REACT_APP_CONTEXT_PATH;

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      email: "",
      encryptedPassword: "",
      firstName: "",
      lastName: "",
      createAt: "",
      updateAt: ""
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('userId') == null || sessionStorage.getItem('jwt') == null ) {
      this.props.history.push('/login');
    }

    const profileUserId = sessionStorage.getItem('profileUserId');
    if (profileUserId == null) {
      this.props.history.push('/admin/users');
    }

    // console.log("userprofile userId:" + profileUserId);

    axios
    .get(`http://${HOST}:${PORT}${CONTEXT_PATH}/users/${profileUserId}`, {
      headers: {
        "Authorization" : sessionStorage.getItem('jwt')
      }
    }).then((response) => {
      const data = response.data;
      this.setState({
        userId: data.userId,
        username: data.username,
        email: data.email,
        encryptedPassword: data.encryptedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        createAt: data.createAt,
        updateAt: data.updateAt
  
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  onUpdatePress() {
    // if (sessionStorage.getItem('userId') == null || sessionStorage.getItem('jwt') == null ) {
    //   this.props.history.push('/login');
    // }

    // const profileUserId = sessionStorage.getItem('profileUserId');
    // if (profileUserId == null) {
    //   this.props.history.push('/admin/users');
    // }

    // axios
    // .put(`http://${HOST}:${PORT}${CONTEXT_PATH}/users/${profileUserId}`, {
    //   username: this.state.username,
    //   email: this.state.email,
    //   password: "123456Ab",
    //   firstName: "updated_peter1",
    //   lastName: "update_sun1"
    // },
    // {
    //   headers: {
    //     "Authorization" : sessionStorage.getItem('jwt')
    //   }
    // }).then((response) => {
    //   const data = response.data;
    //   this.setState({
    //     userId: data.userId,
    //     username: data.username,
    //     email: data.email,
    //     encryptedPassword: data.encryptedPassword,
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     createAt: data.createAt,
    //     updateAt: data.updateAt
  
    //   });
    // }).catch((err) => {
    //   console.log(err);
    // });
  }


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5"]}
                      properties={[
                        {
                          label: "Company (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company",
                          defaultValue: "Dog of the Dow",
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-4"]}
                      properties={[
                        {
                          label: "User Id (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "User Id",
                          defaultValue: this.state.userId,
                          disabled: true
                        },
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: this.state.username
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: this.state.email
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Encrypted Password",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Encrypted Password",
                          defaultValue: this.state.encryptedPassword
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: this.state.firstName
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: this.state.lastName
                        }
                      ]}
                    />
                    {/* <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Adress",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Home Adress",
                          defaultValue:
                            "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                        }
                      ]}
                    /> */}
                    <FormInputs
                      ncols={["col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Create At (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: this.state.createAt,
                          disabled: true
                        },
                        {
                          label: "Update At (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: this.state.updateAt,
                          disabled: true
                        },
                        // {
                        //   label: "Postal Code",
                        //   type: "number",
                        //   bsClass: "form-control",
                        //   placeholder: "ZIP Code"
                        // }
                      ]}
                    />
                    <Button bsStyle="danger" pullRight fill type="submit">
                      Delete User
                    </Button>
                    <Button bsStyle="info" pullRight fill type="submit" onClick={() => this.onUpdatePress()}>
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={logo}
                name={this.state.firstName +" "+ this.state.lastName}
                userName={this.state.username}
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;