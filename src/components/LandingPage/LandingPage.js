import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {Container, Box, FunHeader, BoxText, StandardButton} from './LandingStyles';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <Container>
        
        
        <Box>
           <FunHeader>Let's Bard-y Like its 1599!</FunHeader>
            <img className="bard-bust" src="images/birmingham-museums-trust-L2sbcLBJwOc-unsplash.jpg" alt="shakespeare bust"/>
        </Box>
          <Box>
          
            <RegisterForm />

            <center>
              <BoxText>Already a Member?</BoxText>
              <p>Or go to login form by clicking below</p>
              <StandardButton onClick={this.onLogin}>
                Login
              </StandardButton>
            </center>
          
        </Box>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
