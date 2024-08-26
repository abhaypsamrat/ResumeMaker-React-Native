import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';

const Resume2 = ({route}) => {
  const {formData} = route.params;
  const [pdfPath, setPdfPath] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  useEffect(() => {
    if (formData.image) {
      convertImageToBase64(formData.image).then(base64 => {
        setImageBase64(base64);
      });
    }
  }, [formData.image]);

  function getSkillBarColor(proficiency) {
    if (proficiency >= 80) return '#4caf50'; // Green for high proficiency
    if (proficiency >= 50) return '#ffeb3b'; // Yellow for medium proficiency
    return '#f44336'; // Red for low proficiency
  }

  const generatePdf = async () => {
    try {
      // Convert image to base64 string
      const imageBase64 = await convertImageToBase64(formData.image);

      let htmlContent = `
       <html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 12px;
      background-size: cover; 
      background-repeat: no-repeat; 
    }
    .container {
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.8); 
    }
    .name {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
       margin-top: 40px;
      text-align: center;
    }
    .title {
      font-size: 18px;
      margin-top: 20px;
      text-align: center;
    }
    .summary {
      font-size: 18px;
      margin-bottom: 5px;
      margin-top: 5px;
    }
    .sectionTitle {
      font-size: 24px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 8px;
    }
    .leftColumn {
      width: 40%;
      display: inline-block;
      vertical-align: top;
      padding-right: 5px;
    }
    .rightColumn {
      width: 58%;
      display: inline-block;
      vertical-align: top;
       padding-left: 5px;
    }
    .item {
      font-size: 18px;
      margin-top: 5px;
    }
    .experience-item {
      display: flex;
      flex-direction: column;
    }
    .experience-header {
      display: flex;
    }
    .companyName {
      text-align: right;
      font-weight: bold;
    }
    .date {
      text-align: left;
      font-size: 16px;
      margin-left: 10px;
    }
    // .education-item {
    //   display: flex;
    //   flex-direction: column;
    //   margin-bottom: 10px;
    // }
    // .education-header {
    //   display: flex;
    //   justify-content: space-between;
    // }
    // .schoolName {
    //   text-align: left;
    //   font-weight: bold;
    // }

     .education-section {
    position: relative;
    padding-left: 20px; /* Adjust the padding to make space for the line */
  }
  .education-section::before {
    content: '';
    position: absolute;
    left: 10px; /* Position the vertical line */
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #000; /* Color of the vertical line */
  }
  .education-item {
    position: relative;
    padding-left: 15px; /* Adjust to align with the circle */
    margin-bottom: 10px;
  }
  .education-item::before {
    content: '';
    position: absolute;
    left: -25px; /* Position the circle */
    top: 10px; /* Position the circle vertically */
    width: 10px;
    height: 10px;
    background-color: #000; /* Color of the circle */
    border-radius: 50%; /* Make the circle round */
  }
  .schoolName {
    text-align: left;
    font-weight: bold;
    margin-top: 10px; /* Optional: Adjust the spacing */
  }
    
    .dates {
      font-size: 16px;
    }
    .projectName {
      font-weight: bold;
    }
    .description {
      margin-bottom: 8px;
    }
    .ImgContainer {
      text-align: center;
    }
    .profile-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 10px auto; 
      display: block;
    }
    .skill-bar-container {
      margin-top: 5px;
      margin-bottom: 10px;
      width: 100%;
      background-color: #ddd;
      border-radius: 20px;
    }
    .skill-bar {
      height: 18px;
      border-radius: 20px;
      text-align: center;
      color: white;
      line-height: 18px; /* Match height to vertically center the text */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="name">${formData.name}</div>
    <div class="leftColumn">
    <div class="ImgContainer">
    <img src="data:image/jpeg;base64, ${imageBase64}" class="profile-img" />
    </div>
      
      <div class="title">${formData.title}</div>
      <div class="sectionTitle">About Me</div>
      <div class="summary">${formData.summary}</div>
      <div class="sectionTitle">Skills</div>
      ${formData.skills
        .map(
          skill => `
            <div class="item">${skill.name}</div>
          `,
        )
        .join('')}
      <div class="sectionTitle">Languages</div>
      ${formData.languages
        .map(
          language => `
            <div class="item">${language.name}</div>
            <div class="skill-bar-container">
              <div class="skill-bar" style="width: ${
                language.proficiency
              }%; background-color: ${getSkillBarColor(language.proficiency)};">
                ${language.proficiency}%
              </div>
            </div>
          `,
        )
        .join('')}
      <div class="sectionTitle">Basic Details</div>
      <div class="item">Email: ${formData.email}</div>
      <div class="item">Phone: ${formData.phone}</div>
      <div class="item">Address: ${formData.address}</div>
    </div>
    <div class="rightColumn">
      <div class="sectionTitle">Education</div>
      <div class="education-section">
  ${formData.education
    .map(
      edu => `
        <div class="item education-item">
          <div class="schoolName">${edu.schoolName}</div>
          <div class="dates">${edu.startDate} - ${edu.endDate}</div>
          <div class="item">${edu.fieldOfStudy}</div>
        </div>
      `,
    )
    .join('')}
</div>
      <div class="sectionTitle">Experience</div>
      ${formData.experience
        .map(
          exp => `
            <div class="item experience-item">
              <div class="experience-header">
                <div class="companyName">${exp.companyName}</div>
                <div class="date">(${exp.startDate} - ${exp.endDate})</div>
              </div>
              <div class="item">${exp.jobTitle}</div>
              <div class="description">${exp.description}</div>
            </div>
          `,
        )
        .join('')}
      <div class="sectionTitle">Projects</div>
      ${formData.projects
        .map(
          project => `
            <div class="item">
              <div class="projectName">${project.name}</div>
              <div class="description">${project.description}</div>
            </div>
          `,
        )
        .join('')}
    </div>
  </div>
</body>
</html>

      `;

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to save PDF files.',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied!',
            'You need to give storage permission to save the file.',
          );
          return;
        }
      }
      const downloadDir = `${RNFetchBlob.fs.dirs.DownloadDir}`;
      let options = {
        html: htmlContent,
        fileName: 'resume2',
        directory: downloadDir,
        base64: true,
      };

      let file = await RNHTMLtoPDF.convert(options);

      // Save the file to the Download directory
      const filePath = `${downloadDir}/resume2.pdf`;
      await RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64');

      setPdfPath(filePath);
      Alert.alert(`PDF generated at: ${filePath}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Failed to generate PDF');
    }
  };

  const convertImageToBase64 = async uri => {
    if (!uri) return '';

    const fs = RNFetchBlob.fs;
    try {
      const data = await fs.readFile(uri, 'base64');
      return data;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return '';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.page}>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{formData.name}</Text>
            </View>
          </View>
          <View style={styles.columnsContainer}>
            {/* Left Column */}

            <View style={styles.leftColumn}>
              <View style={styles.ImageContainer}>
                <Image
                  source={{uri: `data:image/jpeg;base64,${imageBase64}`}}
                  style={styles.profileIMG}
                />
              </View>
              <Text style={styles.title}>{formData.title}</Text>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.summary}>{formData.summary}</Text>
              <Text style={styles.sectionTitle}>Skills</Text>
              {formData.skills.map((skill, index) => (
                <Text key={index} style={styles.item}>
                  {skill.name}
                </Text>
              ))}

              <Text style={styles.sectionTitle}>Languages</Text>
              {formData.languages.map((languages, index) => (
                <Text key={index} style={styles.item}>
                  {languages.name}
                </Text>
              ))}
              <Text style={styles.sectionTitle}>Details</Text>
              <Text style={styles.item}>Email: {formData.email}</Text>
              <Text style={styles.item}>Phone: {formData.phone}</Text>
              <Text style={styles.item}>Address: {formData.address}</Text>
            </View>

            <View style={styles.rightColumn}>
              <Text style={styles.sectionTitle}>Education</Text>
              {formData.education.map((edu, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.schoolName}>{edu.schoolName}</Text>
                  <Text style={styles.item}>{edu.city}</Text>
                  <Text style={styles.date}>
                    {edu.startDate}-{edu.endDate}
                  </Text>

                  <Text style={styles.item}>{edu.fieldOfStudy}</Text>
                </View>
              ))}

              <Text style={styles.sectionTitle}>Experience</Text>
              {formData.experience.map((exp, index) => (
                <View key={index}>
                  <Text style={styles.companyName}>{exp.companyName}</Text>
                  <Text style={styles.item}>{exp.jobTitle}</Text>
                  <Text style={styles.date}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                  <Text style={[styles.item, styles.description]}>
                    {exp.description}
                  </Text>
                </View>
              ))}
              <Text style={styles.sectionTitle}>Projects</Text>
              {formData.projects.map((project, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.item}>{project.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={generatePdf} style={styles.addButton}>
        <Text style={styles.addButtonText}>Generate PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  page: {
    flex: 1,
    flexDirection: 'column',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  nameContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  contactContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginBottom: 5,
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '50%',
    paddingRight: 10,
  },
  rightColumn: {
    width: '60%',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ImageContainer: {
    alignItems: 'center',
  },
  profileIMG: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  item: {
    fontSize: 12,
  },
  summary: {
    fontSize: 12,
    marginBottom: 5,
    // textAlign: 'justify',
  },
  companyName: {
    fontWeight: '500',
    fontSize: 12,
  },
  description: {
    marginBottom: 5,
  },
  schoolName: {
    fontWeight: '500',
    fontSize: 12,
  },
  projectName: {
    fontWeight: '500',
    fontSize: 12,
  },
  date: {
    fontSize: 11,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Resume2;
