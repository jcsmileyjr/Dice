import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';

import '../App.css';

//Standard information box to display label and text for items in the Point area
export default function Display(props){
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
                md={4} 
                className="displayData rightAlignData">{props.data}</Col>
        </Row>
      </Container>
    );
  }