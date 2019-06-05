import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

import '../App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign} from '@fortawesome/free-solid-svg-icons'

library.add( faDollarSign);


//component called when the player wins Shows a rising dollar sign
export default function DollarSign(props){
    return(
      <Container>
        <Row className="center">
          <Col><h4>You Won this round!!!</h4></Col>
        </Row>
        <Row className="center">
          <Col className={`${props.rising}`}>
          <FontAwesomeIcon icon="dollar-sign" size="9x" />
          </Col>
        </Row>
      </Container>
    );
  }