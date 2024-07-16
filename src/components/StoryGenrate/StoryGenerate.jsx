import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { SERVER_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

function StoryGenerate() {
  const navigate = useNavigate()
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleInput1Change = (e) => {
    console.log(e.target.value, "value");
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${SERVER_URL}/story`,
        data: { title: input1, prompt: input2 },
      });
      console.log(data, "res");

      navigate(`/continue-story/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" centerContent>
        <Box padding="4" bg="purple.100" w="100%" borderRadius="md">
          <VStack spacing={6}>
            <Heading as="h1" size="xl" color="PURPLE">
              이로봇
            </Heading>
            <FormControl>
              <FormLabel>제목을 정해주세요:</FormLabel>
              <Input
                type="text"
                value={input1}
                onChange={handleInput1Change}
                bg="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>첫 문장을 입력하세요:</FormLabel>
              <Input
                type="text"
                value={input2}
                onChange={handleInput2Change}
                bg="white"
              />
            </FormControl>
            <Button colorScheme="purple" onClick={handleSubmit}>
              이야기 생성
            </Button>
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default StoryGenerate;
