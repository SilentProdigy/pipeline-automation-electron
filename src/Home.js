import React, { useState } from 'react';
import { Box, Heading, Button, VStack, Textarea, FormControl, FormLabel, Flex, Stack, Icon, chakra, VisuallyHidden, Text, FormHelperText } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  const downloadFile = async () => {
    try {
      const response = await fetch('http://localhost:3001/download', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'filename.txt'); // Replace with the filename you want
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Button colorScheme="teal" mt={4} onClick={downloadFile}>
        Download File
      </Button>
    </VStack>
  );
};

export default Home;