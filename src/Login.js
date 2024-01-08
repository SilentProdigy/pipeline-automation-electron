// src/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

const LoginForm = () => {
  const history = useNavigate();

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

    const url = 'http://localhost:3001/login'; // Replace with your actual server URL
    

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: formData.username,
            password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const responseData = await response.json();
      console.log(responseData.message); // Successful login message
      history('/home');
    } catch (error) {
      console.error('Login error:', error.message);
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
            Login
          </Button>
        </form>
      </Box>
    </VStack>
  );
};

export default LoginForm;
