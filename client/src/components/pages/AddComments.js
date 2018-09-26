import React, { Component } from 'react';
import api from '../../api'


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
    api.postComment( this.props.id, this.state.description )
      .then(res => {
        console.log(this.state.description)
        this.props.onSubmit(this.state)
        this.setState({
          description:" "
        })
        
      })
      .catch(err => {
        console.log(err);
        console.log('ERROR')
      })
  }

  render() {
    return (
      <div className="Login">
        <h2>Post</h2>
        <form>
          Description:
          <textarea type="text" value={this.state.description} onChange={(e) => this.handleInputChange(e)} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Post</button>
        </form>
      </div>
    );
  }
}


export default AddComments;
