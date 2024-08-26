import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

const Title = ({formData, handleSingleInputChange}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Title</Text>
      <TextInput
        style={[styles.input, styles.titleInput]}
        placeholder="Enter your title here..."
        placeholderTextColor="#888"
        onChangeText={text => handleSingleInputChange('title', text)}
        value={formData.title}
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
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  titleInput: {
    height: 50, // Adjusted input height to match design
  },
});

export default Title;
