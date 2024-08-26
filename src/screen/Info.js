import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import BasicDetails from '../components/BasicDetails';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Title from '../components/Title';
import Summary from '../components/Summary';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Languages from '../components/Languages';

const Info = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    experience: [
      {companyName: '', jobTitle: '', startDate: '', endDate: '', city: ''},
    ],
    education: [
      {schoolName: '', city: '', startDate: '', endDate: '', fieldOfStudy: ''},
    ],
    skills: [''],
    projects: [{name: '', description: ''}],
    languages: [''],
  });

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('formData');
        if (savedData !== null) {
          setFormData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading form data from AsyncStorage:', error);
      }
    };

    loadFormData();
  }, []);

  useEffect(() => {
    const saveFormData = async () => {
      try {
        await AsyncStorage.setItem('formData', JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving form data to AsyncStorage:', error);
      }
    };

    saveFormData();
  }, [formData]);

  const handleInputChange = (section, index, field, value) => {
    const updatedSection = formData[section].map((item, i) => {
      if (i === index) {
        return {...item, [field]: value};
      }
      return item;
    });
    setFormData({...formData, [section]: updatedSection});
  };

  const handleSingleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleAddField = section => {
    const newField =
      section === 'experience' || section === 'education'
        ? {companyName: '', jobTitle: '', startDate: '', endDate: '', city: ''}
        : section === 'skills'
        ? ''
        : {name: '', description: ''};
    setFormData({...formData, [section]: [...formData[section], newField]});
  };

  const handleDeleteField = (section, index) => {
    const updatedSection = formData[section].filter((item, i) => i !== index);
    setFormData({...formData, [section]: updatedSection});
  };

  const resume1 = () => {
    navigation.navigate('Resume1', {formData});
  };
  const resume2 = () => {
    navigation.navigate('Resume2', {formData});
  };

  return (
    <ScrollView style={styles.container}>
      <Title
        formData={formData}
        handleSingleInputChange={handleSingleInputChange}
      />
      <BasicDetails
        formData={formData}
        handleSingleInputChange={handleSingleInputChange}
      />
      <Summary
        formData={formData}
        handleSingleInputChange={handleSingleInputChange}
      />
      <Experience
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddField={handleAddField}
        handleDeleteField={handleDeleteField}
      />
      <Education
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddField={handleAddField}
        handleDeleteField={handleDeleteField}
      />
      <Skills
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddField={handleAddField}
        handleDeleteField={handleDeleteField}
      />
      <Projects
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddField={handleAddField}
        handleDeleteField={handleDeleteField}
      />
      <Languages
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddField={handleAddField}
        handleDeleteField={handleDeleteField}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={resume1}>
          <Text style={styles.buttonText}>Resume 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resume2}>
          <Text style={styles.buttonText}>Resume 2</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f7f8fa',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#32a852',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Info;
