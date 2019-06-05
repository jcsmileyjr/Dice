import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';

import '../App.css';

//Standard information box to display label and text
export default function DisplayButton(props){
    return(
      <Container>
        <Row>
          <Col  xs={{span:7, offset:1}} 
                sm={{span:4, offset:4}} 
                md={{span:4, offset:3}} 
                lg={{span:3, offset:4}} 
                className="displayData blueColor">{props.title}</Col>
          <Col  xs={4} 
                sm={4} 
                md={{span:3, offset:1}} 
                lg={3} 
                className="leftAlignData ">
                  <Button variant="success" 
                          onClick={() => {props.addToBet()}}
                          className="buttonTextColor">x 5</Button>
          </Col>
        </Row>
      </Container>
    );
  }