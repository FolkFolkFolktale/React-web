import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../constants";
import axios from "axios";
import {
  ChakraProvider,
  Container,
  VStack,
  Heading,
  Image,
  Text,
  Button,
  Box,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";

function ContinueStory() {
  const params = useParams();
  const isInit = useRef(false)
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(isInit.current) return;
    const fetchStory = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${SERVER_URL}/story/${params.id}`,
        });
        setContent(data.body);
        isInit.current = true
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [params.id]);

  const onClickStory = async (idx) => {
    const {data} = await axios({
      method: "post",
      url: `${SERVER_URL}/story/${params.id}/continue/${idx}`,
    });
    setContent(data);
  };

  if (isLoading) {
    return (
      <ChakraProvider>
        <Container centerContent>
          <Spinner size="xl" />
        </Container>
      </ChakraProvider>
    );
  }

  if (!content) {
    return (
      <ChakraProvider>
        <Container centerContent>
          <Text>No story content available.</Text>
        </Container>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={8}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            {content.title}
          </Heading>

          {content.imageUrl && (
            <Image
              src={content.imageUrl}
              alt="Story Image"
              borderRadius="md"
              objectFit="cover"
              maxH="300px"
              w="100%"
            />
          )}

          <Box bg="gray.100" p={4} borderRadius="md" key='initial_story'>
            <Text fontSize="lg">{content.content}</Text>
          </Box>

          {content.choices &&
            content.choices.length > 0 &&
            content.continuationCount === 0 && (
              <VStack spacing={4}>
                <SimpleGrid columns={[]} spacing={4} width="100%">
                  {content.choices.map((choice, index) => (
                    <Button
                      key={index}
                      colorScheme="blue"
                      size="lg"
                      onClick={() => onClickStory(index+1)}
                    >
                      {choice}
                    </Button>
                  ))}
                </SimpleGrid>
              </VStack>
            )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default ContinueStory;
