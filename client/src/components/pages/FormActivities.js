import React, { Component } from 'react';
import api from '../../api'

class FormActivities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      category: "",
      picture: "",
      description: "",
      
    }
    
    if(!api.isLoggedIn){
     this.props.history.push("/")
    }
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
    api.editActivity(data)
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
      .catch(err => {
        console.log('ERROR')
      })
  }
  render() {
    return (
      <div className="AddCountry">
        <h2>Edit an activity</h2>
        <form>
          Name: <input type="text" name="name" value={this.state.name} onChange={(e) => { this.handleInputChange("name", e) }} /> <br />
          Picture: <input type="text" name="picture" value={this.state.picture} onChange={(e) => { this.handleInputChange("picture", e) }} /> <br />
          Category: <input type="text"  name="category" value={this.state.category} onChange={(e) => { this.handleInputChange("category", e) }} /> <br />
          Description: <textarea name="description" value={this.state.description} cols="30" rows="10" onChange={(e) => { this.handleInputChange("description", e) }} ></textarea> <br />
          <button onClick={(e) => this.handleClick(e)}>Submit</button>
        </form>
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