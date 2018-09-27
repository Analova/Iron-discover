import React, { Component } from 'react';
import api from '../../api'
import AddComments from "./AddComments"
import { Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
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
    return (
      <div>
        <Container style={{ margin: 20 }} >
          <Media >
            <Media left href="#">
              <img src={this.state.activity.picture} style={{ height: 400, width: 400, objectFit: "cover" }} />
              <Media />
            </Media>
            <Media body>
              <Media heading>
                {this.state.activity.name}
              </Media>
              <strong>Category: </strong> {this.state.activity.category} <br></br>
              <strong>Description: </strong>{this.state.activity.description}
            </Media>
          </Media>

          <Row>
            <Col sm={6}>
              <br />
              {this.state.currentUser === this.state.activity._owner &&
                <Link to={`/activity/${this.state.activity._id}/edit`} >Edit</Link>}
              <AddComments onSubmit={e => this.handleOnSubmit(e)} id={this.props.match.params.id} />
            </Col>
            {
              this.state.comments.map((c, i) => <p key={i}>{c.description}
                <br />
                {this.state.currentUser === this.state.comments._owner &&
                  <Button onClick={e => this.handleDelete(c._id)}>Delete</Button>}
              </p>
              )
            }
          </Row>

        </Container>
      </div >
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
