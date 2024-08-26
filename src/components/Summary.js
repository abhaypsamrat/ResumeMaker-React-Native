import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

const Summary = ({formData, handleSingleInputChange}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Summary</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write your summary here (more than 50 words)..."
        multiline
        numberOfLines={5}
        placeholderTextColor="#888"
        onChangeText={text => handleSingleInputChange('summary', text)}
        value={formData.summary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120, // Adjusted height for better readability
    textAlignVertical: 'top', // Align text to the top of the textarea
  },
});

export default Summary;
