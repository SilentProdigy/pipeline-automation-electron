// src/App.js
import React, {useState} from 'react';
import { ChakraProvider, CSSReset, theme, Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import RegistrationForm from './Registration';
import Home from './Home';
import LoginForm from './Login';

const App = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);

  const mockLogin = () => {
    setLoggedIn(true);
  };
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Container maxW="container.md" mt={10}>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/home"
              element={
                isLoggedIn ? (
                  <Home />
                ) : (
                  // Redirect to login if not logged in
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<LoginForm onLogin={mockLogin} />} />
          </Routes>
        </Router>
      </Container>
    </ChakraProvider>
  );
};

export default App;
