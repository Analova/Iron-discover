import React from 'react';
import {
  Input,
  Form,
  FormGroup,
  Col
} from 'reactstrap'

const Search = (props) => {
  return (
    <div className="Search">
      <Form>
        <FormGroup row>

          <Col sm={7}>
            <Input type="text" name="search" placeholder="Search"
              value={props.search}
              onChange={props.onChange}
            />
          </Col>

          <Col sm={5}>
            <Input type="select" name="category"
              value={props.category}
              onChange={props.onChange}
            >
              <option value="">Change a category</option>
              <option value="cruises">Cruises</option>
              <option value="museums">Museums</option>
              <option value="food">Food</option>
              <option value="history">History</option>
            </Input>
          </Col>

        </FormGroup>
      </Form>
    </div>
  )

}

export default Search