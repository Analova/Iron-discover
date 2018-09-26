import React, { Component } from 'react';
import api from '../../api'
import AddComments from "./AddComments"
import { Link } from 'react-router-dom'


class idActivity extends Component {
  constructor(props){
    super(props)
    this.state={
      activity:{},
      comments:[]
    }
  }

  

  handleOnSubmit(newComment){
    console.log("COMMENT", this.state.comments)
    this.setState({comments: [...this.state.comments, newComment ]})
  }

  handleDelete(id){
    console.log("handleDelete")
    api.deleteComment(id)
    .then(data=>{
      if(data.success){
        this.setState({
          comments:this.state.comments.filter(c=>c._id !== id)
        })
      }
    })
   
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
        
      <AddComments onSubmit={e=> this.handleOnSubmit(e)} id={this.props.match.params.id} />
       {this.state.comments.map((c)=> <p key={c._id}>{c.description}
       <button onClick={e=>this.handleDelete(c._id)}>Delete</button>
       </p>
       )}
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