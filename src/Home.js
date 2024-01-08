import React, { useState } from 'react';
import { Box, Heading, Button, VStack, Textarea, FormControl, FormLabel, Flex, Stack, Icon, chakra, VisuallyHidden, Text, FormHelperText } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [fileContent, setFileContent] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleFileUpload = () => {
    console.log('File uploaded:', file);
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Box maxW="md" mx="auto" p={8} borderWidth={1} borderRadius="md" boxShadow="md">
        <Heading mb={4}>Welcome to the New Homepage!</Heading>
        <p>This is your new homepage content.</p>
        <FormControl>
              <Flex
                mt={1}
                justify="center"
                px={6}
                pt={5}
                pb={6}
                borderWidth={2}
                _dark={{
                  color: "gray.500",
                }}
                borderStyle="dashed"
                rounded="md"
              >
                <Stack spacing={1} textAlign="center">
                  <Icon
                    mx="auto"
                    boxSize={12}
                    color="gray.400"
                    _dark={{
                      color: "gray.500",
                    }}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                  <Flex
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                      color: "gray.400",
                    }}
                    alignItems="baseline"
                  >
                    <chakra.label
                      htmlFor="file-upload"
                      cursor="pointer"
                      rounded="md"
                      fontSize="md"
                      color="brand.600"
                      _dark={{
                        color: "brand.200",
                      }}
                      pos="relative"
                      _hover={{
                        color: "brand.400",
                        _dark: {
                          color: "brand.300",
                        },
                      }}
                    >
                      <span>Upload a file</span>
                      <VisuallyHidden>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          accept=".txt"
                        />
                      </VisuallyHidden>
                    </chakra.label>
                    <Text pl={1}>or drag and drop</Text>
                  </Flex>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    .TXT up to 10MB
                  </Text>
                </Stack>
              </Flex>
            </FormControl>
        {/* <input type="file" accept=".txt" onChange={handleFileChange} /> */}
        {fileContent && (
          <>
            <FormControl id="email" mt={1}>
                <Textarea
                  placeholder="you@example.com"
                  mt={1}
                  rows={10}
                  shadow="sm"
                  focusBorderColor="brand.400"
                  fontSize={{
                    sm: "sm",
                  }}
                  overflowY="auto"
                  resize={'vertical'}
                  height="full"
                  value={fileContent} onChange={(e) => setFileContent(e.target.value)}
                />
                <FormHelperText>
                  Edit and save the file you uploaded.
                </FormHelperText>
              </FormControl>
            {/* <Textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} /> */}
            <Button colorScheme="teal" mt={4} onClick={handleFileUpload}>
              Upload and Edit
            </Button>
          </>
        )}
        {/* <Button colorScheme="teal" mt={4}>
          <Link to="/home">Go to the Original Homepage</Link>
        </Button> */}
      </Box>
    </VStack>
  );
};

export default Home;