import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const Experience = ({
  formData,
  handleInputChange,
  handleAddField,
  handleDeleteField,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Experience</Text>
      {formData.experience.map((exp, index) => (
        <View key={index} style={styles.experienceContainer}>
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            onChangeText={text =>
              handleInputChange('experience', index, 'companyName', text)
            }
            value={exp.companyName}
          />
          <TextInput
            style={styles.input}
            placeholder="Job Title"
            onChangeText={text =>
              handleInputChange('experience', index, 'jobTitle', text)
            }
            value={exp.jobTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Date"
            onChangeText={text =>
              handleInputChange('experience', index, 'startDate', text)
            }
            value={exp.startDate}
          />
          <TextInput
            style={styles.input}
            placeholder="End Date"
            onChangeText={text =>
              handleInputChange('experience', index, 'endDate', text)
            }
            value={exp.endDate}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Job Description"
            onChangeText={text =>
              handleInputChange('experience', index, 'description', text)
            }
            value={exp.description}
            multiline
            numberOfLines={4}
          />
          {index > 0 && (
            <TouchableOpacity
              onPress={() => handleDeleteField('experience', index)}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => handleAddField('experience')}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More Experience</Text>
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
  experienceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
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
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
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

export default Experience;
