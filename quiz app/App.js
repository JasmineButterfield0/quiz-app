import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Question from './components/question';
import Summary from './components/summary';

const App = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions] = useState([
    {
      prompt: 'What year did spongebob squarepants premiered? ',
      type: 'multiple-choice',
      choices: ['1994', '2000', '1999', '1998'],
      correct: 2,
    },
     {    
      prompt: "Who is spongebob's best friend ? (Must select two answers) ",
      type: "multiple-answer",      
      choices: ['Patrick','Squidward','Garry','Sandy'],       
      correct: [0, 2],
     },
    {
      prompt: 'Is it true or false that Spongebob and Patrick are little kids in Kamp Koral: Spongebob Under Years? ',
      type: 'true-false',
      choices: ['True', 'False'],
      correct: 0,
    },
  ]);

  const handleSelectOption = (selectedOptionIndex) => {
    const updatedAnswers = [...userAnswers];
    if (questions[currentQuestion].type === 'multiple-answer') {
      updatedAnswers[currentQuestion] = updatedAnswers[currentQuestion] || [];
      const index = updatedAnswers[currentQuestion].indexOf(selectedOptionIndex);
      if (index === -1) {
        updatedAnswers[currentQuestion].push(selectedOptionIndex);
      } else {
        updatedAnswers[currentQuestion].splice(index, 1);
      }
    } else {
      updatedAnswers[currentQuestion] = [selectedOptionIndex];
    }
    setUserAnswers(updatedAnswers);


    const isCorrect = questions[currentQuestion].type === 'multiple-answer'
      ? questions[currentQuestion].correct.every(correctIndex =>
          userAnswers[currentQuestion].includes(correctIndex))
      : questions[currentQuestion].correct === selectedOptionIndex;

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (userAnswers[currentQuestion]) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert('Please select an answer before proceeding.');
    }
  };

  return (
    <View style={styles.container}>
      {currentQuestion < questions.length ? (
        <Question
          data={questions[currentQuestion]}
          onSelectOption={handleSelectOption}
          selectedOptions={userAnswers[currentQuestion] || []}
        />
      ) : (
        <Summary
          questions={questions}
          userAnswers={userAnswers}
          score={score}
        />
      )}
      {currentQuestion < questions.length && (
        <Button
          title="Next Question"
          onPress={handleNextQuestion}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
