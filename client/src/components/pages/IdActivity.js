import React, { Component } from 'react';
import api from '../../api'
import AddComments from "./AddComments"
import { Link } from 'react-router-dom'
import FormActivities from './FormActivities';

class idActivity extends Component {
  constructor(props){
    super(props)
    this.state={
      activity:{},
      comments:[]
    }
  }

  handleOnChange(newComment){
    this.setState({comments: [...this.state.comments,newComment ]})
  }

  render() {  
    console.log("STATE",this.state.comments)             
    return (
      <div className="idActivity">
        <h2>Activity profile</h2>
        <p>Name:{this.state.activity.name}</p>
        <p>Description:{this.state.activity.description}</p>
        <p>Category:{this.state.activity.category}</p>
        <p>Picture:<img src={this.state.activity.picture} style={{ height: 50, width: 50, objectFit: "cover" }}/ ></p>
        <Link to={`/activity/${this.state.activity._id}/edit`} >Edit</Link>
        
      <AddComments onChange={e=> this.handleOnChange(e)} id={this.props.match.params.id} />
       {this.state.comments.map((c)=> <p>{c.description}</p>)}
      {/* <FormActivities/> */}
      </div>
    );
  }

  componentDidMount(){    
    api.profileActivity(this.props.match.params.id)
    .then(res => {
      this.setState({ activity:res.activity, comments:res.comments})
      }
      )
    }
}

export default idActivity;