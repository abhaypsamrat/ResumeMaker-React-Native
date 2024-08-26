import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const Languages = ({
  formData,
  handleInputChange,
  handleAddField,
  handleDeleteField,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Languages</Text>
      {formData.languages.map((language, index) => (
        <View key={index} style={styles.languageContainer}>
          <TextInput
            style={styles.input}
            placeholder="Language"
            onChangeText={text =>
              handleInputChange('languages', index, 'name', text)
            }
            value={language.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Proficiency %"
            onChangeText={text =>
              handleInputChange('languages', index, 'proficiency', text)
            }
            value={language.proficiency}
            keyboardType="numeric"
          />
          {index > 0 && (
            <TouchableOpacity
              onPress={() => handleDeleteField('languages', index)}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => handleAddField('languages')}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Language</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 0,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  languageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    backgroundColor: '#dc3545',
    borderRadius: 50,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Languages;
