// src/App.js
import React from 'react';
import { ChakraProvider, CSSReset, theme, Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './Registration';
import Home from './Home';
import LoginForm from './Login';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Container maxW="container.md" mt={10}>
        <Router>
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </Container>
    </ChakraProvider>
  );
};

export default App;
