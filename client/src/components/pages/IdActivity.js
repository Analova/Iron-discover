import React, { Component } from 'react';
import api from '../../api'
import AddComments from "./AddComments"
import { Link } from 'react-router-dom';
import {
  Card, CardText, CardTitle,
  Media,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';


class idActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {},
      comments: [],
    }
  }


  handleOnSubmit(newComment) {
    this.setState({ comments: [...this.state.comments, newComment] })
  }

  handleDelete(id) {
    api.deleteComment(id)
      .then(data => {
        if (data.success) {
          this.setState({
            comments: this.state.comments.filter(c => c._id !== id)
          })
        }
      })
  }


  render() {
    console.log("COMMENTS", this.state.comments)
    return (
      <Container>
        <Row className="align-items-center">
          <Col md="4">
            <img className="img-fluid" src={this.state.activity.picture} style={{ objectFit: "cover" }} />
          </Col>
          <Col md="8">
            <h2>{this.state.activity.name}</h2>
            <p><strong>Category: </strong> {this.state.activity.category} </p>
            <p><strong>Description: </strong>{this.state.activity.description}</p>
          </Col>
        </Row>
        <Row >
          <Col md="12">
            <br />
            {this.state.currentUser === this.state.activity._owner &&
              <Link to={`/activity/${this.state.activity._id}/edit`} >Edit</Link>}
            <AddComments onSubmit={e => this.handleOnSubmit(e)} id={this.props.match.params.id} />
          </Col>
        </Row>
        {
          this.state.comments.map((c, i) =>
            <div key={i} className="card-container" >
              <Card className="card-comment">
                <CardTitle>{c.description} </CardTitle>
                <CardText>Published by {c._owner.username}</CardText>
                <CardText>
                  {
                    this.state.currentUser === c._owner._id &&
                    <Button onClick={e => this.handleDelete(c._id)}>Delete</Button>
                  }
                </CardText>
              </Card>
            </div >
          )
        }
      </Container>
    );
  }

  componentDidMount() {
    let user = api.loadUser()
    this.setState({ currentUser: user._id })
    api.profileActivity(this.props.match.params.id)
      .then(res => {
        this.setState({ activity: res.activity, comments: res.comments })
      }
      )
  }
}


export default idActivity;
