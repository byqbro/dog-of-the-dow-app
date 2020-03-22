/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
import { Button } from "@material-ui/core";

const config = require('../config.json');
const IP = config['IP'];
const PORT = config['PORT'];
const CONTEXT_PATH = config['CONTEXT-PATH'];

class TableList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersInfo: [],
    }

    this.renderUser= this.renderUser.bind(this);
    this.onRowClick = this.onRowClick.bind(this);

  }


  componentDidMount() {
    if (sessionStorage.getItem('userId') == null || sessionStorage.getItem('jwt') == null) {
      this.props.history.push('/login');
    }

    axios
    .get(`http://${IP}:${PORT}${CONTEXT_PATH}/users`, {
      headers: {
        "Authorization" : sessionStorage.getItem('jwt')
      }
    }).then((response) => {
      // console.log(response);
      this.setState({usersInfo: response.data});
    }).catch((err) => {
      console.log(err);
    });

  }

  onRowClick(user) {
    //console.log("userId:" + user.userId);
    sessionStorage.setItem('profileUserId', user.userId);
    this.props.history.push('/admin/user/profile');
  }

  renderUser(user, index) {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{user.userId}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.createAt}</td>
        <td>{user.updateAt}</td>
        <td><FontAwesomeIcon icon={faUserEdit} onClick={() => this.onRowClick(user)}/></td>
      </tr>
    )
  }


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="User Table"
                category="users in the database"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Create At</th>
                        <th>Update At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.usersInfo.map(this.renderUser)}
                    </tbody>
                  </Table>
                }
              />
            </Col>

            {/* <Col md={12}>
              <Card
                plain
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col> */}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
