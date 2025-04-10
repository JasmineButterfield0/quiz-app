
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Question = ({ data, onSelectOption, selectedOptions }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{data.prompt}</Text>
      {data.choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOptions.includes(index) && styles.selectedOption,
          ]}
          onPress={() => onSelectOption(index)}
          role="button"
        >
          <Text style={styles.optionText}>{choice}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: 'blue',
  },
  optionText: {
    fontSize: 16,
  },
});

export default Question;
