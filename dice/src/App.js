import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
      instructions:"The objective of the game is roll the dice to establish a point or a 7 on the first roll. Then re-roll the dice till you hit the point again or lose by hitting a 7.",
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

        {this.state.point !== 0 && 
          <Row className="aboveWhiteSpace">
            <Col xs={12}><h3 className="center">Establish Point</h3></Col>           
            <Col xs={{span:8, offset:2}} sm={{span:4, offset:4}} className="pointArea">
              {this.state.point}
            </Col> 
          </Row>                     
        }

        <Row>
          <Col className="buttonStyle">
            <Button variant="success" size="lg" className="buttonTextColor">
              {this.state.buttonText}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="aboveWhiteSpace" xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6, offset:3}}>
            <h4>Instructions</h4>
            <p>{this.state.instructions}</p>          
          </Col>
        </Row>
      </Container>      
    );
  }
}

export default App;
