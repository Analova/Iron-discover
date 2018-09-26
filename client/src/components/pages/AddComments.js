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

class AddComments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: "",
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      description: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.postComment(this.props.id, this.state.description)
      .then(res => {
        this.props.onSubmit(res.comment)
        this.setState({
          description: " "
        })

      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  }

  render() {
    return (
      <div className="Login">
        <h2>Share you exprinece</h2>
        <FormGroup row>
          <Label for="exampleText" sm={4}></Label>
          <Col sm={4}>
            <Input
              type="textarea"
              value={this.state.description} onChange={(e) => this.handleInputChange(e)}
            />
          </Col>
        </FormGroup>
        <Button color="primary" size="m" onClick={(e) => this.handleClick(e)}>Comment</Button>
      </div >
    );
  }
}


export default AddComments;
