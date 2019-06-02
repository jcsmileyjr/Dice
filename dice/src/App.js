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
        <Col className="center blueColor">
        <h1>Let's Play Dice</h1>
        </Col>
      </Row>
    </Container>
  );
}

//Standard information box to display label and text
function Display(props){
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

//Standard information box to display label and text
function DisplayButton(props){
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

//component that display a dice based on a random number given as a prop
function Dice(props){
  return(
    <Container>
      <Row>
        {props.dice === 6 &&
          <Col className={`${props.rolling}`}><FontAwesomeIcon icon="dice-six" size="6x" color={props.startGameDiceColor} /></Col>
        }        
        {props.dice === 5 &&
          <Col className={`${props.rolling}`}><FontAwesomeIcon icon="dice-five" size="6x" color={props.startGameDiceColor} /></Col>
        }
        {props.dice === 4 &&
          <Col className={`${props.rolling}`}><FontAwesomeIcon icon="dice-four" size="6x" color={props.startGameDiceColor}/></Col>
        }
        {props.dice === 3 &&
          <Col className={`${props.rolling}`}><FontAwesomeIcon icon="dice-three" size="6x" color={props.startGameDiceColor}/></Col>
        }
        {props.dice === 2 &&
          <Col className={`${props.rolling}`}><FontAwesomeIcon icon="dice-two" size="6x" color={props.startGameDiceColor}/></Col>
        }  
        {props.dice === 1 &&
          <Col className={`${props.rolling}`}><FontAwesomeIcon icon="dice-one" size="6x" color={props.startGameDiceColor}/></Col>
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
      bet:5,
      funds:25,
      buttonText:"Start Game",
      diceStartColor:"green",
      leftRollingDice:"",
      rightRollingDice:"",
      instructions:"The objective of the game is roll the dice to establish a point or a 7 on the first roll. Then re-roll the dice till you hit the point again or lose by hitting a 7. If you roll a 2 or 3 on the come out roll, its a loss.",
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

    //establish the point for the user. If the user roll a 7 on the come out roll,
    //then its a automatic win. If its a 2 or 3, then its a automatic lose.
    if(this.state.point === 0 || this.state.point === "Win" || this.state.point === "Lose"){
      if(newPoint === 7){
        this.resetGameWin();
        return;
      }else if(newPoint === 2 || newPoint===3){
        this.resetGameLose();
        return;
      }else {
        let text = "Roll Again";
        this.establishPoint(newPoint, text); 
        return;
      }
    }
     
    //if the user hit the point, reset the game and show the user they won
    if(newPoint === this.state.point){
      this.resetGameWin();
    }

    //if the user hit a 7, reset the game and show the user they lost
    if(newPoint === 7){
      this.resetGameLose();
    }    
  }

  //reset the game if won
  resetGameWin = () =>{
    let text = "Play Again";
    const winLoss = true;
    this.resetGame(text, winLoss);
    this.winBet();
    this.resetBet();    
    return;    
  }

  //reset the game if lose
  resetGameLose = () =>{
    let text = "Play Again";
    const winLoss = false;
    this.resetGame(text, winLoss);
    this.loseBet();
    this.resetBet();       
    return;    
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
  
  //reset game state based on if the player win or lose
  resetGame = (text, winLoss) =>{
    if(winLoss) {
      this.setState(previousState => ({
        point: "Win",
      }));
    }else {
      this.setState(previousState => ({
        point: "Lose",
      }));      
    }    

    this.setState(previousState => ({
      instructions: "The objective of the game is roll the dice to establish a point or a 7 on the first roll. Then re-roll the dice till you hit the point again or lose by hitting a 7.",
    }));
    
    this.setState(previousState => ({
      buttonText: text,
    })); 
  }   

  //method to add to the user funds the bet amount if win. Called in rollDice().
  winBet = () =>{
    this.setState(previousState => ({
      funds: this.state.bet + previousState.funds,
    }));     
  }

  //method to subtract the bet amount from the user funds if lose. Called in rollDice().
  loseBet = () =>{
    this.setState(previousState => ({
      funds: previousState.funds - this.state.bet,
    }));     
  }  

  //method to increase the bet amount up to the fund limit. If the bet amount is greater then fund
  //then the bet amount start over at 5.
  increaseBet = () =>{
    if(this.state.bet >= this.state.funds){
      this.setState(previousState => ({
        bet: 5,
      }));      
    }else {
      this.setState(previousState => ({
        bet: previousState.bet + 5,
      }));
    }
  }

  //method to reset bet amount after each game. Call in loseBet() & winBet()
  resetBet = () =>{
    this.setState(previousState => ({
      bet: 5,
    }));    
  }

  //change the dice color between each game
  gameDiceColor = () =>{
    if(this.state.diceStartColor === "green") {
      this.setState(previousState => ({
        diceStartColor: "navy",
      })); 
    }else {
      this.setState(previousState => ({
        diceStartColor: "green",
      })); 
    }      
  }

  //animate the dice rolling by bouncing. 
  showBouncingDice = () =>{

    this.gameDiceColor(); //change the color of the dice from green to blue.

    this.setState(previousState => ({
      leftRollingDice: "leftRollingDice",
    }));
    
    this.setState(previousState => ({
      rightRollingDice: "rightRollingDice",
    }));    
    
    setTimeout(this.hideBouncingDice, 3000);
  }

  //cancel the rolling dice animation
  hideBouncingDice = () =>{
    this.setState(previousState => ({
      leftRollingDice: "",
    })); 
    
    this.setState(previousState => ({
      rightRollingDice: "",
    }));    
    
    this.rollDice();
    this.gameDiceColor(); //change the color of the dice back from blue to green
  }

  render(){
    return(
      <Container className="appBackground">
        <Row><Title /></Row>        
        <Row>
          <Col className="leftDice"><Dice dice = {this.state.leftDice} startGameDiceColor={this.state.diceStartColor} rolling={this.state.leftRollingDice} /></Col>
          <Col className="rightDice"><Dice dice = {this.state.rightDice} startGameDiceColor={this.state.diceStartColor} rolling={this.state.rightRollingDice} /></Col>
        </Row>
        <Row><Display title={"Current Point"} data={this.state.point} /></Row>
        <Row><Display title={"Current Bet"} data={this.state.bet} /></Row>
        <Row><DisplayButton title={"Increase Bet"} addToBet = {this.increaseBet} /></Row>
        <Row><Display title={"Funds"} data={this.state.funds} /></Row>
        <Row>
          <Col className="buttonStyle">
            <Button variant="success" 
                    size="lg"
                    onClick={() => {this.showBouncingDice()}} 
                    className="buttonTextColor">
              {this.state.buttonText}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="aboveWhiteSpace" xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:4, offset:4}}>
            <h4>Instructions</h4>
            <p>{this.state.instructions}</p>          
          </Col>
        </Row>
      </Container>      
    );
  }
}

export default App;
