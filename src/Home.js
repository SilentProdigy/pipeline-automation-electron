// src/NewHomepage.js
import React from 'react';
import { Box, Heading, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Box maxW="md" mx="auto" p={8} borderWidth={1} borderRadius="md" boxShadow="md">
        <Heading mb={4}>Welcome to the New Homepage!</Heading>
        <p>This is your new homepage content.</p>
        <Button colorScheme="teal" mt={4}>
          <Link to="/home">Go to the Original Homepage</Link>
        </Button>
      </Box>
    </VStack>
  );
};

export default Home;
