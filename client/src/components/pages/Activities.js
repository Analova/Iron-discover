import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Container, Row
} from 'reactstrap';

import Search from './searchBar'

class Activities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      search: "",
    }
  }

  componentDidMount() {
    api.getActivities()
      .then(activities => {
        this.setState({
          activities: activities
        })
      })
  }

  handleDlete(id) {
    api.deleteActivity(id)
      .then(data => {
        if (data.success) {
          this.setState({
            activities: this.state.activities.filter(c => c._id !== id)
          })
        }
      })

  }

  handleClick(activityId) {
    this.props.history.push('/activity/' + activityId)

  }

  render() {
    return (
      <Container ontainer className="Activities" >
        <h2>What do you want to do today?</h2>
        <Search search={this.state.search} onChange={(e) => { this.setState({ search: e.target.value }) }} />
        <Row>
          {this.state.activities
            .filter((el, i) =>
              el.category.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1

            )
            .map(a =>
              <Col sm="6" lg="4">
                <Card onClick={e => this.handleClick(a._id)}>
                  <CardImg top width="100%" src={a.picture} />
                  <CardBody>
                    <CardSubtitle>{a.name}</CardSubtitle>
                    <CardText>{a.category}</CardText>
                    {/* <CardText>{a.description}</CardText> */}
                  </CardBody>
                </Card>
                <br />
              </Col>
            )}
        </Row>
      </Container>



    );
  }
}

export default Activities;

