import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

import '../App.css';

//Nav component for the app
export default function Title(props){
    return(
      <Container>
        <Row>
          <Col className="center blueColor">
          <h1>Let's Play Dice</h1>
          </Col>
        </Row>
      </Container>
    );
  }