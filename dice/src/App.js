import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function Title(props){
  return(
    <Container>
      <Row>
        <Col>
        <h1>Let's Play Dice</h1>
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  return (
    <div className="App">
      <Title />
    </div>
  );
}

export default App;
