
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Summary = ({ questions, userAnswers, score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.quizComplete}>Quiz Complete!</Text>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>Question {index + 1}: {question.prompt}</Text>
          <Text>Your Answer: {getUserAnswerText(question, userAnswers[index])}</Text>
        </View>
      ))}
      <Text style={styles.scoreText}>Total Score: {score} / {questions.length}</Text>
    </View>
  );
};

const getUserAnswerText = (question, userAnswer) => {
  if (question.type === 'multiple-choice') {
    return question.choices[userAnswer];
  } else if (question.type === 'multiple-answer') {
    return userAnswer.map(index => question.choices[index]).join(', ');
  } else {
    return question.choices[userAnswer];
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizComplete: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default Summary;
