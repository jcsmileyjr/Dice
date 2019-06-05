import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

import '../App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne} from '@fortawesome/free-solid-svg-icons'

library.add(faDiceSix, faDiceFive, faDiceFour, faDiceThree, faDiceTwo, faDiceOne);


//component that display a dice based on a random number given as a prop
export default function Dice(props){
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