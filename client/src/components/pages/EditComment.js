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
      description: "",

    }

    if (!api.isLoggedIn) {
      this.props.history.push("/")
    }
  }

  componentDidMount() {
    api.profileActivity(this.props.match.params.id)
      .then((comment) => {
        console.log(comment)
        this.setState({
          description: comment.comment.description,
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
      description: this.state.description,
    }
    api.editComment(this.props.match.params.id, data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          description: "",
        })
        this.props.history.push("/activities")
      })
      .catch(error => {
        console.log('ERROR')
      })
  }
  render() {
    return (
      <div className="AddCountry">
        <h2>Edit comment</h2>

        <FormGroup row>
          <Label for="exampleText" sm={4}>Description</Label>
          <Col sm={4}>
            <Input
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


