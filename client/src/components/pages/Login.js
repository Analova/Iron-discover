import React, { Component } from 'react';
import api from '../../api';
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: ""
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
        this.setState({
          message: "Please sign up "
        })
      })
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <FormGroup row>
          <Label for="exampleName" sm={4}>Username</Label>
          <Col sm={4}>
            <Input
              ype="text" value={this.state.username}
              onChange={(e) => this.handleInputChange("username", e)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleName" sm={4}>Password</Label>
          <Col sm={4}>
            <Input
              type="password" value={this.state.password}
              onChange={(e) => this.handleInputChange("password", e)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          {this.state.message && this.state.message}
        </FormGroup>

        <Button color="primary" onClick={(e) => this.handleClick(e)}>Login</Button>
      </div>
    );
  }
}

export default Login;
