import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BasicDetails = ({formData, handleSingleInputChange}) => {
  const [imageUri, setImageUri] = useState(formData.image || '');

  const handleImagePick = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        handleSingleInputChange('image', uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Basic Details</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.image} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Icon name="person" size={50} color="#ccc" />
            <Text style={styles.imagePlaceholderText}>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        onChangeText={text => handleSingleInputChange('name', text)}
        value={formData.name}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={text => handleSingleInputChange('email', text)}
        value={formData.email}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#888"
        onChangeText={text => handleSingleInputChange('phone', text)}
        value={formData.phone}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#888"
        onChangeText={text => handleSingleInputChange('address', text)}
        value={formData.address}
      />

      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Change Image</Text>
      </TouchableOpacity>
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#888',
    marginTop: 10,
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BasicDetails;
