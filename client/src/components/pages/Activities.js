import React, { Component } from 'react';
import api from '../../api';
import { Link, Switch, Route } from 'react-router-dom'

class Activities extends Component {
  constructor(props){
    super(props)
    this.state={
      activities:[]
    }
  }

  componentDidMount(){
    api.getActivities()
    .then(activities=>{
      this.setState({
        activities:activities
      })
    })
  }
  render() {                
    return (
      <div >
        <h2>View all activities</h2>
        <table style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Picture</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.activities.map((c) => <tr key={c._id}>
          <Link to={`/activity/${c._id}`} activeClassName="current">
              <td>{c.name}</td>
              <td>{c.category}</td>
              <td> <img src={c.picture} style={{ height: 50, width: 50, objectFit: "cover" }} /></td>
              <td>{c.description}</td>
          </Link>
  
            </tr>)}
          </tbody>
        </table>
        
        </div>
        
    );
  }
}

export default Activities;