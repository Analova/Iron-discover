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
    console.log("handledlete")
    api.deleteActivity(id)
      .then(data => {
        if (data.success) {
          this.setState({
            activities: this.state.activities.filter(c => c._id !== id)
          })
        }
      })

  }

  render() {
    return (
      <Container >
        <h2>View all activities</h2>
        <Search search={this.state.search} onChange={(e) => { this.setState({ search: e.target.value }) }} />
        <Row>
          {this.state.activities.filter((el, i) => { return el.name.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1 }).map((c) =>
            <Col sm="6">
              <Card >
                <CardImg top width="100%" src={c.picture} />
                <CardBody>
                  <CardSubtitle>Name:{c.name}</CardSubtitle>
                  <CardSubtitle>Category:{c.category}</CardSubtitle>
                  <CardText>Description:{c.description}</CardText>
                  <Link color="primary" size="sm" to={`/activity/${c._id}`} activeClassName="current">View more </Link>
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

