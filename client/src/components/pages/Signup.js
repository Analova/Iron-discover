import React, { Component } from 'react';
import api from '../../api';
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Alert,
  Form
} from 'reactstrap';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: "",
      message: "",
      visible: true
    }
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }


  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value,
      message: ""
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
    }
    api
      .signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/login") // Redirect to the login page
      })
      .catch(err => {
        console.log('ERROR')
        this.setState({
          message: "The username already exists"
        })
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
              input type="text" name="username" value={this.state.username}
              onChange={(e) => this.handleInputChange("username", e)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleName" sm={4}>Password</Label>
          <Col sm={4}>
            <Input
              input type="password" name="password" value={this.state.password}
              onChange={(e) => this.handleInputChange("password", e)}
            />
          </Col>
        </FormGroup>

        <Form>
          <Label ></Label>
          <Col className="text-center" sm={4}>
            {this.state.message && (
              <Alert
                color="danger"
                isOpen={this.state.visible}
                toggle={this.onDismiss}
              >
                {this.state.message}
              </Alert>
            )}
          </Col>
        </Form>
        <Button color="primary" onClick={(e) => this.handleClick(e)}>Signup</Button>
      </div>
    );
  }
}

export default Signup;
