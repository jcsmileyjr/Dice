import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne} from '@fortawesome/free-solid-svg-icons'

library.add(faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne);

//Nav component for the app
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

//component that display a dice based on a random number given as a prop
function Dice(props){
  return(
    <Container>
      <Row>
        {props.dice === 6 &&
          <Col><FontAwesomeIcon icon="dice-six" size="6x" color="navy"/></Col>
        }        
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

//Dice game that simulate rolling two dice with the intent of hitting the inital sum of dice again before the sum of 7 is rolled
class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      leftDice:5,
      rightDice:4,
      point:0,
      buttonText:"Start Game",
      instructions:"The objective of the game is roll the dice to establish a point or a 7 on the first roll. Then re-roll the dice till you hit the point again or lose by hitting a 7.",
    }
  }

  //method in the button that simulate the rolling of the dice, update the state, and compute the logic
  rollDice = () =>{
    const randomLeftDice = Math.floor(Math.random() * 6) + 1; //get random number for dice
    const randomRightDice = Math.floor(Math.random() * 6) + 1;//get random number for dice
    const newPoint = randomLeftDice + randomRightDice; //get new point

    this.setState(previousState => ({
      leftDice: randomLeftDice, //change the image of the left dice
    }));
    
    this.setState(previousState => ({
      rightDice: randomRightDice, //change the image of the right dice
    }));

    //establish the point for the user
    if(this.state.point === 0 || this.state.point === "Win" || this.state.point === "Lost"){
      let text = "Roll Again";
      this.establishPoint(newPoint, text);  
    }
     
    //if the user hit the point, reset the game and show the user they won
    if(newPoint === this.state.point){
      let text = "Play Again";
      const winLoss = true;
      this.resetGame(newPoint,text, winLoss);
    }

    //if the user hit a 7, reset the game and show the user they lost
    if(newPoint === 7){
      let text = "Play Again";
      const winLoss = false;
      this.resetGame(newPoint,text, winLoss);
    }    
  }

  //set the point for the user, change the button text and instruction's text
  establishPoint = (point, text) =>{
    this.setState(previousState => ({
      point: point,
    }));    

    this.setState(previousState => ({
      instructions: "Roll the dice again till you hit your point or lose by hitting a 7",
    }));
    
    this.setState(previousState => ({
      buttonText: text,
    })); 
  }
  
  //If the point is hit, reset game state
  resetGame = (point, text, winLoss) =>{
    if(winLoss) {
      this.setState(previousState => ({
        point: "Win",
      }));
    }else {
      this.setState(previousState => ({
        point: "Lost",
      }));      
    }
    

    this.setState(previousState => ({
      instructions: "The objective of the game is roll the dice to establish a point or a 7 on the first roll. Then re-roll the dice till you hit the point again or lose by hitting a 7.",
    }));
    
    this.setState(previousState => ({
      buttonText: text,
    })); 
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
            <Button variant="success" 
                    size="lg"
                    onClick={() => {this.rollDice()}} 
                    className="buttonTextColor">
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
