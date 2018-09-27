import React, { Component } from 'react';
import api from '../../api';
import {
  Button,
  Form,
  Col,
  FormGroup,
  Input,
  Label,
  FormText,
} from 'reactstrap';



class AddActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      category: "",
      picture: "",
      description: "",

    }

    if (!api.isLoggedIn) {
      this.props.history.push("/")
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value

    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      name: this.state.name,
      category: this.state.category,
      picture: this.state.picture,
      description: this.state.description,
    }
    api.postActivity(data)
      .then(result => {
        this.setState({
          name: "",
          picture: "",
          description: "",
          category: "",
        })
        this.props.history.push("/")
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  }
  render() {
    return (
      <div className="AddCountry">
        <h1 className="text-center">Add an activity</h1>
        <Form>
          <FormGroup row>
            <Label for="exampleName" sm={4}>Name</Label>
            <Col sm={4}>
              <Input
                type="text"
                value={this.state.name}
                onChange={(e) => { this.handleInputChange("name", e) }}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="exampleName" sm={4}>Picture</Label>
            <Col sm={4}>
              <Input
                type="text"
                value={this.state.picture}
                onChange={(e) => { this.handleInputChange("picture", e) }}
              />
            </Col>
          </FormGroup>



          <FormGroup row>
            <Label for="exampleName" sm={4}>Category</Label>
            <Col sm={4}>
              <Input
                type="text"
                value={this.state.category}
                onChange={(e) => { this.handleInputChange("category", e) }}
              />
            </Col>
          </FormGroup>


          <FormGroup row>
            <Label for="exampleText" sm={4}>Description</Label>
            <Col sm={4}>
              <Input
                type="textarea"
                name="motivation"
                type="textarea"
                value={this.state.description}
                onChange={(e) => { this.handleInputChange("description", e) }}
              />

            </Col>
          </FormGroup>
          <Button color="primary" size="m" onClick={(e) => this.handleClick(e)}>
            Submit
          </Button>
        </Form>

        <div style={{
          margin: 10,
          backgroundColor: "red",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default AddActivity;
