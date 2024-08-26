import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const Education = ({
  formData,
  handleInputChange,
  handleAddField,
  handleDeleteField,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Education</Text>
      {formData.education.map((edu, index) => (
        <View key={index} style={styles.educationContainer}>
          <TextInput
            style={styles.input}
            placeholder="School Name"
            onChangeText={text =>
              handleInputChange('education', index, 'schoolName', text)
            }
            value={edu.schoolName}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            onChangeText={text =>
              handleInputChange('education', index, 'city', text)
            }
            value={edu.city}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Date"
            onChangeText={text =>
              handleInputChange('education', index, 'startDate', text)
            }
            value={edu.startDate}
          />
          <TextInput
            style={styles.input}
            placeholder="End Date"
            onChangeText={text =>
              handleInputChange('education', index, 'endDate', text)
            }
            value={edu.endDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Field of Study"
            onChangeText={text =>
              handleInputChange('education', index, 'fieldOfStudy', text)
            }
            value={edu.fieldOfStudy}
          />
          {index > 0 && (
            <TouchableOpacity
              onPress={() => handleDeleteField('education', index)}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => handleAddField('education')}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More Education</Text>
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
  educationContainer: {
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

export default Education;
