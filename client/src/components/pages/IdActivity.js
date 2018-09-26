import React, { Component } from 'react';
import api from '../../api'
import AddComments from "./AddComments"
import { Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  Button,
  Container
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

  handleClick() {
    this.props.history.push('/activities/')
  }

  render() {
    return (
      <div>
        <Container>
          <Media >
            <Media left href="#" style={{ margin: 20 }} onClick={e => this.handleClick()}>
              <img src={this.state.activity.picture} style={{ height: 400, width: 400, objectFit: "cover", margin: 20 }} />
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
          <br />
          {this.state.currentUser === this.state.activity._owner &&
            <Link to={`/activity/${this.state.activity._id}/edit`} >Edit</Link>}
          <AddComments onSubmit={e => this.handleOnSubmit(e)} id={this.props.match.params.id} />
          {
            this.state.comments.map((c, i) => <p key={i}>{c.description}
              <br />
              <Button onClick={e => this.handleDelete(c._id)}>Delete</Button>
            </p>
            )
          }
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
