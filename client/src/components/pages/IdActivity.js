import React, { Component } from 'react';
import api from '../../api'
import AddComments from "./AddComments"
import { Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  Button,
} from 'reactstrap';


class idActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {},
      comments: [],
      like: 0
    }
  }



  handleOnSubmit(newComment) {
    console.log("COMMENT", this.state.comments)
    this.setState({ comments: [...this.state.comments, newComment] })
  }

  handleDelete(id) {
    console.log("handleDelete")
    api.deleteComment(id)
      .then(data => {
        if (data.success) {
          this.setState({
            comments: this.state.comments.filter(c => c._id !== id)
          })
        }
      })

  }


  handleClick(data) {
    this.setState({
      like: this.state.like + 1
    })

  }

  render() {
    console.log("STATE", this.state.comments)
    return (
      <div>
        <Media style={{ margin: 20 }}>
          <Media left href="#">
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
        <Button onClick={e => this.handleClick('like')}>Like{this.state.like}</Button>
        <Link to={`/activity/${this.state.activity._id}/edit`} >Edit</Link>
        <AddComments onSubmit={e => this.handleOnSubmit(e)} id={this.props.match.params.id} />
        {
          this.state.comments.map((c) => <p key={c._id}>{c.description}
            <Button onClick={e => this.handleDelete(c._id)}>Delete</Button>
            <Link to={`/comments/${this.state.comments._id}/edit`} >Edit</Link>
          </p>
          )
        }
      </div >
    );
  }

  componentDidMount() {
    api.profileActivity(this.props.match.params.id)
      .then(res => {
        this.setState({ activity: res.activity, comments: res.comments })
      }
      )
  }
}

export default idActivity;
