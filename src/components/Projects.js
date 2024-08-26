import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const Projects = ({
  formData,
  handleInputChange,
  handleAddField,
  handleDeleteField,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Projects</Text>
      {formData.projects.map((project, index) => (
        <View key={index} style={styles.projectContainer}>
          <TextInput
            style={styles.input}
            placeholder="Project Name"
            onChangeText={text =>
              handleInputChange('projects', index, 'name', text)
            }
            value={project.name}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            onChangeText={text =>
              handleInputChange('projects', index, 'description', text)
            }
            value={project.description}
            multiline
            numberOfLines={4}
          />
          {index > 0 && (
            <TouchableOpacity
              onPress={() => handleDeleteField('projects', index)}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => handleAddField('projects')}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Project</Text>
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
  projectContainer: {
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
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  textArea: {
    height: 80,
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

export default Projects;
