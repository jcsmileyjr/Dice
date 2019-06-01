import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne} from '@fortawesome/free-solid-svg-icons'

library.add(faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne);

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
    <Container>
      <Row>
        {props.dice === 5 &&
          <Col><FontAwesomeIcon icon="dice-five" size="6x" color="navy"/></Col>
        }
        {props.dice === 4 &&
          <Col><FontAwesomeIcon icon="dice-four" size="6x" color="navy"/></Col>
        }
        {props.dice === 3 &&
          <Col><FontAwesomeIcon icon="dice-three" size="6x" color="navy"/></Col>
        }
        {props.dice === 2 &&
          <Col><FontAwesomeIcon icon="dice-two" size="6x" color="navy"/></Col>
        }  
        {props.dice === 1 &&
          <Col><FontAwesomeIcon icon="dice-one" size="6x" color="navy"/></Col>
        }                         
      </Row>
    </Container>
  );
}

class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      leftDice:5,
      rightDice:4,
      point:10,
      dice:"",
      buttonText:"Start Game",
      instructions:"",
    }
  }

  render(){
    return(
      <Container className="appBackground">
        <Row><Title /></Row>        
        <Row>
          <Col className="leftDice"><Dice dice = {this.state.leftDice} /></Col>
          <Col className="rightDice"><Dice dice = {this.state.rightDice} /></Col>
        </Row>
        <Row>
          <Col xs={{span:8, offset:2}} sm={{span:4, offset:4}} className="pointArea">
            {this.state.point !== 0 && this.state.point}
          </Col>
        </Row>
      </Container>      
    );
  }
}

export default App;
