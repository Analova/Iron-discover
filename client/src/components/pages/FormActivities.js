import React, { Component } from 'react';
import api from '../../api'
import {
  Button,
  Form,
  Col,
  FormGroup,
  Input,
  Label,
  FormText,
} from 'reactstrap';

class FormActivities extends Component {
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

  componentDidMount() {
    api.profileActivity(this.props.match.params.id)
      .then((activity) => {
        this.setState({
          name: activity.activity.name,
          category: activity.activity.category,
          picture: activity.activity.picture,
          description: activity.activity.description,
        })
      })
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
    api.editActivity(this.props.match.params.id, data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          name: "",
          picture: "",
          description: "",
          category: "",
        })
        this.props.history.push("/")
      })
      .catch(error => {
        console.log('ERROR')
      })
  }
  render() {
    return (
      <div className="AddCountry">
        <h2>Edit an activity</h2>

        <FormGroup row>
          <Label for="exampleEmail" sm={4}>Name</Label>
          <Col sm={4}>
            <Input
              type="text"
              name="name"
              value={this.state.name} onChange={(e) => { this.handleInputChange("name", e) }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleEmail" sm={4}>Picture</Label>
          <Col sm={4}>
            <Input
              type="text"
              name="picture"
              value={this.state.picture} onChange={(e) => { this.handleInputChange("picture", e) }}
            />
          </Col>
        </FormGroup>


        <FormGroup row>
          <Label for="exampleEmail" sm={4}>Category</Label>
          <Col sm={4}>
            <Input
              type="text"
              name="category"
              value={this.state.category} onChange={(e) => { this.handleInputChange("category", e) }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleText" sm={4}>Description</Label>
          <Col sm={4}>
            <Input
              name="motivation"
              type="textarea"
              value={this.state.description}
              onChange={(e) => { this.handleInputChange("description", e) }}
            />

          </Col>
        </FormGroup>
        <Button color="primary" onClick={(e) => this.handleClick(e)}>Submit</Button>

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

export default FormActivities;
