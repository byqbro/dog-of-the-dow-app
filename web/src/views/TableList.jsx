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
import axios from 'axios';

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
      console.log(response);
      this.setState({usersInfo: response.data});
    }).catch((err) => {
      console.log(err);
    });

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
                        <th>ID</th>
                        <th>USERID</th>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                        <th>FIRSTNAME</th>
                        <th>LASTNAME</th>
                        <th>CREATEAT</th>
                        <th>UPDATEAT</th>
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
