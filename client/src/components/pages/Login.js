import React, { Component } from 'react';
import api from '../../api';
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Alert,
} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
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
      // message: ""
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
          message: "Please signup "
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
          <Col sm={4}>
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
        </FormGroup>

        <Button color="primary" onClick={(e) => this.handleClick(e)}>Login</Button>
      </div>
    );
  }
}

export default Login;
