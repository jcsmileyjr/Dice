import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceFive, faDiceTwo} from '@fortawesome/free-solid-svg-icons'

library.add(faDiceFive, faDiceTwo);

function Title(props){
  return(
    <Container>
      <Row>
        <Col className="center">
        <h1>Let's Play Dice</h1>
        </Col>
      </Row>
    </Container>
  );
}

function Dice(props){
  return(
    <Container className="center">
      <Row>
        <Col><h2>Dice</h2></Col>
      </Row>
      <Row>
        <Col><FontAwesomeIcon icon="dice-five" size="6x"/></Col>
        <Col><FontAwesomeIcon icon="dice-two" size="6x"/></Col>
      </Row>
    </Container>
  );
}

class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      leftDice:"",
      rightDice:"",
      point:0,
      dice:"",
      buttonText:"Start Game",
      instructions:"",
    }
  }

  render(){
    return(
      <Container>
        <Row><Title /></Row>
        <Row><Dice /></Row>
      </Container>      
    );
  }
}

export default App;
