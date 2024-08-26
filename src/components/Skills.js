import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Skills = ({
  formData,
  handleInputChange,
  handleAddField,
  handleDeleteField,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Skills</Text>
      {formData.skills.map((skill, index) => (
        <View key={index} style={styles.skillContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter skill"
            value={skill.name}
            onChangeText={text =>
              handleInputChange('skills', index, 'name', text)
            }
          />
          {index > 0 && (
            <TouchableOpacity
              onPress={() => handleDeleteField('skills', index)}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => handleAddField('skills')}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More Skills</Text>
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
  skillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
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
});

export default Skills;
