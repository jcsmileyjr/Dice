import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';

import '../App.css';

export default function GameOver(props){
    return(
        <Container className="bankrupt">
            <Row>
                <Col className="center buttonGameOverColor"><h1>Bankrupt</h1></Col>
            </Row>
            <Row>
                <Col className="center">
                    <Button variant="success" 
                            size="lg"
                            onClick={() => {props.restart()}} 
                            className="buttonTextColor">Start Over</Button></Col>
            </Row>
        </Container>
    );
}