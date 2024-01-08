// src/App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import RegistrationForm from './Registration';

const App = () => {
  return (
    <ChakraProvider>
      <RegistrationForm />
    </ChakraProvider>
  );
};

export default App;
