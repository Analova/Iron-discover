import React, { Component } from 'react';
import api from '../../api';
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: "",
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/login") // Redirect to the login page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <FormGroup row>
          <Label for="exampleName" sm={4}>Username</Label>
          <Col sm={4}>
            <Input
              input type="text" value={this.state.username}
              onChange={(e) => this.handleInputChange("username", e)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleName" sm={4}>Password</Label>
          <Col sm={4}>
            <Input
              input type="password" value={this.state.password}
              onChange={(e) => this.handleInputChange("password", e)}
            />
          </Col>
        </FormGroup>

        <Button color="primary" onClick={(e) => this.handleClick(e)}>Signup</Button>
      </div>
    );
  }
}

export default Signup;
