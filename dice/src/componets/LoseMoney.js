import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

import '../App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons'

library.add( faHandHoldingUsd);

//component called when the player lose, Shows a hand taking money
export default function LoseMoney(props){
    return(
      <Container>
        <Row className="center">
          <Col><h4>You Lose this round!!!</h4></Col>
        </Row>
        <Row className="center">
          <Col className={`${props.taking}`}>
          <FontAwesomeIcon icon="hand-holding-usd" size="9x" />
          </Col>
        </Row>
      </Container>
    );
  }