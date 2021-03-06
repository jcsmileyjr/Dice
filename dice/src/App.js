import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import GameOver from './componets/GameOver';
import Title from './componets/Title';
import Display from './componets/Display';
import DisplayButton from './componets/DisplayButton';
import DollarSign from './componets/DollarSign';
import LoseMoney from './componets/LoseMoney';
import Dice from './componets/Dice';

//Dice game that simulate rolling two dice with the intent of hitting the inital sum of dice again before the sum of 7 is rolled
class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      playing:true,//if true allow user to play.If false, show bankrupt
      leftDice:5,//used to pick the image of the left dice
      rightDice:4,//used to pick the image of the right dice
      point:0,//current point (left dice plus right dice) the player is trying to roll again
      bet:5,//current bettting amount of player
      funds:25,//current fund amount of player
      buttonText:"Start Game",//dynamic change text of main action button
      diceStartColor:"green",//dynamic put animation css change on dice to change color of dice to show if its rolling or sitting still
      leftRollingDice:"",//use to dynamic put animation css on the element to roll dice
      rightRollingDice:"",//dynamic put animation css on the right dice to simulate rolling
      risingDollarSign:"",//dynamic put animation css on the dollar sign to show it rising
      losingMoneySign:"",
      instructions:"The objective of the game is roll the dice to establish a point or a 7 on the first roll. Then re-roll the dice till you hit the point again or lose by hitting a 7. If you roll a 2 or 3 on the come out roll, its a loss.",
    }
  }

  //method in the button that simulate the rolling of the dice, update the state, and compute the logic
  rollDice = () =>{
    const randomLeftDice = Math.floor(Math.random() * 6) + 1; //get random number for dice
    const randomRightDice = Math.floor(Math.random() * 6) + 1;//get random number for dice
    const newPoint = randomLeftDice + randomRightDice; //get new point
    
    this.setState(previousState => ({
      leftDice: randomLeftDice, //change the image of the left dice by getting a random number
    }));
    
    this.setState(previousState => ({
      rightDice: randomRightDice, //change the image of the right dice by getting a random number
    }));

    //establish the point for the user. If the user roll a 7 on the come out roll,
    //then its a automatic win. If its a 2 or 3, then its a automatic lose.
    if(this.state.point === 0 || this.state.point === "Win" || this.state.point === "Lose"){
      if(newPoint === 7){
        this.resetGameWin();//tell the user they won, reset the game, add money to funds
        return;
      }else if(newPoint === 2 || newPoint===3){
        this.resetGameLose();//tell user they lost, reset the game, deduct money from funds
        return;
      }else {
        let text = "Roll Again";
        this.establishPoint(newPoint, text); //set the point, change the primary button text
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
    this.resetGame(text, winLoss);  //Let the player know he won and setup for next round
    this.winBet();  //add the betting amount to the player funds
    this.resetBet();  //reset the amount of the bet 
    this.showRisingDollarSign();  //display the dollar sign when the player win
    return;    
  }

  //reset the game if lose
  resetGameLose = () =>{
    let text = "Play Again";
    const winLoss = false;
    this.resetGame(text, winLoss);//let the player know he lost, reset the game
    this.loseBet();//deduct the betting amount from the player funds
    this.resetBet();//reset the amount of the bet
    this.showLosingDollarSign();//display money being taking away when player lose       
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
      instructions: "The objective of the game is roll the dice to establish a point or a 7 on the first roll. \nThen re-roll the dice till you hit the point again or lose by hitting a 7.",
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
      leftRollingDice: "leftRollingDice",//used to dynamiccally add a animation class to the Dice component
    }));
    
    this.setState(previousState => ({
      rightRollingDice: "rightRollingDice",//used to dynamiccally add a animation class to the Dice component
    }));    
    
    setTimeout(this.hideBouncingDice, 2000);//timer to reset the dice by removng the animation class
  } 

  //cancel the rolling dice animation by removing a animation class. Called in the showBouncingDice method
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

  //starts the rising dollar sign animation when a player has won
  showRisingDollarSign = () =>{

    this.setState(previousState => ({
      risingDollarSign: "risingDollarSign",
    }));      

    setTimeout(this.hideRisingDollarSign, 2000);
  }

  //cancel the rising dollar sign animation when a player has won
  hideRisingDollarSign = () =>{

    this.setState(previousState => ({
      risingDollarSign: "",
    }));      
  }
  
  //starts the losing dollar sign animation when a player has won
  showLosingDollarSign = () =>{

    this.setState(previousState => ({
      losingMoneySign: "losingMoneySign",
    }));      

    setTimeout(this.hideLosingDollarSign, 2000);
  }

  //cancel the losing dollar sign animation when a player has won
  hideLosingDollarSign = () =>{

    this.setState(previousState => ({
      losingMoneySign: "",
    }));      
  }   

  //Show the game over screen if funds dip below 0.
  showGameOver = () =>{
    if(this.state.funds >= 0){
      this.setState(previousState => ({
        playing: false,
      })); 
    }    
  }

  //reset all state
  restartGame = () =>{
    this.setState(previousState => ({
      playing: true,
    }));
    
    this.setState(previousState => ({
      point: 0,
    }));    

    this.setState(previousState => ({
      instructions: "The objective of the game is roll the dice to establish a point or a 7 on the first roll. Then re-roll the dice till you hit the point again or lose by hitting a 7. If you roll a 2 or 3 on the come out roll, its a loss.",
    }));
    
    this.setState(previousState => ({
      buttonText: "Start Game",
    }));

    this.setState(previousState => ({
      leftDice: 5,
    }));
    
    this.setState(previousState => ({
      rightDice: 4,
    }));    

    this.setState(previousState => ({
      bet: 5,
    }));
    
    this.setState(previousState => ({
      funds: 25,
    }));    
  }

  render(){
    return(
      <div className="appBackground">
        {/*If true, allow the user to play the application, If false, switch to the GameOver component*/}
        {this.state.playing &&
        <Container>

          {/* Display the title for the application */}
          <Row><Title /></Row>

          {/* Display the left and right dice */}        
          <Row>
            <Col className="leftDice"><Dice dice = {this.state.leftDice} startGameDiceColor={this.state.diceStartColor} rolling={this.state.leftRollingDice} /></Col>
            <Col className="rightDice"><Dice dice = {this.state.rightDice} startGameDiceColor={this.state.diceStartColor} rolling={this.state.rightRollingDice} /></Col>
          </Row>

          {/* If the current point do not equal 0, then show the game stats like current  point, bet, increase button, etc.*/}
          {this.state.point !== 0  &&
            <div>
            <Row><Display title={"Current Point"} data={this.state.point} /></Row>
            <Row><Display title={"Current Bet"} data={this.state.bet} /></Row>
            <Row><DisplayButton title={"Increase Bet"} addToBet = {this.increaseBet} /></Row>
            <Row><Display title={"Funds"} data={this.state.funds} /></Row>
            </div>
          }

          {/* Animation to be displayed if the player wins*/}
          {this.state.risingDollarSign !== "" &&
            <DollarSign rising={this.state.risingDollarSign} />          
          }

          {/* Animation to be displayed if the player lose*/}
          {this.state.losingMoneySign !=="" &&
            <LoseMoney taking={this.state.losingMoneySign} />
          }

          {/* If no animation is display, display the primary action button*/}
          {this.state.risingDollarSign === "" && this.state.losingMoneySign === "" &&
          <div>
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

          {/* Display instructins to the player*/}
          <Row>
            <Col className="aboveWhiteSpace" xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:4, offset:4}}>
              <h4>Instructions</h4>
              <p>{this.state.instructions}</p>          
            </Col>
          </Row>
          </div>         
          }
  
        </Container>     
        }
        {!this.state.playing && <GameOver restart={this.restartGame} />}

      </div>      
    );
  }
}

export default App;
