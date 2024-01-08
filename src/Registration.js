// src/RegistrationForm.js
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP request to the registration endpoint
      const response = await axios.post('http://localhost:3001/register', formData);

      // Handle the response (you can update the UI or redirect the user)
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle errors (display an error message, etc.)
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Box maxW="md" mx="auto" p={8} borderWidth={1} borderRadius="md" boxShadow="md">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </VStack>
  );
};

export default RegistrationForm;
