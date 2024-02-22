import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getNodeQuestions } from "../actions/nodeDetailsActions";
import {
  FormControl,
  FormLabel,
  Select,
  Button,
  Flex,
  IconButton,
  Input,
  Box,
  Heading,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { quizOptions } from "../constants/quizOptions";

const QuizForm = ({ areQuestionsLoading }) => {
  const [quizType, setQuizType] = useState("multiple-choice");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    setNumberOfQuestions(numberOfQuestions + 1);
  };

  const handleDecrement = () => {
    if (numberOfQuestions > 1) {
      setNumberOfQuestions(numberOfQuestions - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setNumberOfQuestions(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Option:", quizType);
    console.log("Number of Questions:", numberOfQuestions);
    dispatch(getNodeQuestions(numberOfQuestions));
  };

  return (
    <Flex justifyContent="center">
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        maxWidth="600px"
        width="100%"
      >
        <Heading as="h2" size="md" mb={4} textAlign="center">
          Quiz Generator
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Select type of Quiz</FormLabel>
            <Select
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              {Object.keys(quizOptions).map((key) => (
                <option key={key} value={key}>
                  {quizOptions[key]}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Select number of Questions</FormLabel>
            <Flex justifyContent="space-evenly" alignItems="center">
              <IconButton
                aria-label="Decrement counter"
                icon={<MinusIcon />}
                onClick={handleDecrement}
              />
              <Input
                value={numberOfQuestions}
                onChange={handleInputChange}
                type="number"
                min={1}
                width="50px"
                textAlign="center"
                pattern="[0-9]*"
              />
              <IconButton
                aria-label="Increment counter"
                icon={<AddIcon />}
                onClick={handleIncrement}
              />
            </Flex>
          </FormControl>

          <Flex justifyContent="center">
            <Button
              mt={4}
              bgColor="#c0eb6a"
              type="submit"
              width="80%"
              isLoading={areQuestionsLoading}
              loadingText="Generating"
            >
              Generate Quiz
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  areQuestionsLoading: state.nodeDetails.areQuestionsLoading,
});

const mapDispatchToProps = {
  getNodeQuestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizForm);
