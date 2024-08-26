import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';

const Resume1 = ({route}) => {
  const {formData} = route.params;
  const [pdfPath, setPdfPath] = useState('');

  const generatePdf = async () => {
    try {
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
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.8); 
      }
      .name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: justify;
         margin-top: 40px;
      }
      .summary {
        font-size: 18px;
        margin-bottom: 5px;
        text-align: justify;
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
      }
      .rightColumn {
        width: 58%;
        display: inline-block;
        vertical-align: top;
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
      .education-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 10
      }
      .education-header {
        display: flex;
        justify-content: space-between;
      }
      .schoolName {
        text-align: left;
        font-weight: bold;
      }
      .dates {
        text-align: right;
        font-size: 16px;
      }
      .projectName {
        font-weight: bold;
      }
      .description {
        margin-bottom: 8
      }
    </style>
  </head>
 <body>
  <div class="container">
    <div class="name">${formData.name}</div>
    <div class="summary">${formData.summary}</div>

    <div>
      <div class="leftColumn">
        <div class="sectionTitle">Education</div>
        ${formData.education
          .map(
            edu => `
            <div class="item education-item">
              <div class="schoolName">${edu.schoolName}</div>
              <div class="item education-header">
                <div class="dates">${edu.startDate} - ${edu.endDate}</div>
              </div>
              <div class="item">Field of Study: ${edu.fieldOfStudy}</div>
            </div>
          `,
          )
          .join('')}
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
            languages => `
            <div class="item">${languages.name}</div>
          `,
          )
          .join('')}
        <div class="sectionTitle">Basic Details</div>
        <div class="item">Email: ${formData.email}</div>
        <div class="item">Phone: ${formData.phone}</div>
        <div class="item">Address: ${formData.address}</div>
      </div>

      <div class="rightColumn">
        <div class="sectionTitle">Experience</div>
        ${formData.experience
          .map(
            exp => `
            <div class="item experience-item">
              <div class="item experience-header">
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
  </div>
</body>
</html>
`;

      // Request storage permission for Android
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

      // Get the path for the Download directory
      const downloadDir = `${RNFetchBlob.fs.dirs.DownloadDir}`;

      let options = {
        html: htmlContent,
        fileName: 'resume1',
        directory: downloadDir, // Use the Download directory path
        base64: true,
      };

      let file = await RNHTMLtoPDF.convert(options);

      // Save the file to the Download directory
      const filePath = `${downloadDir}/resume1.pdf`;
      await RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64');

      setPdfPath(filePath);
      Alert.alert(`PDF generated at: ${filePath}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Failed to generate PDF');
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

            <Text style={styles.summary}>{formData.summary}</Text>
          </View>
          <View style={styles.columnsContainer}>
            <View style={styles.leftColumn}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {formData.skills.map((skill, index) => (
                <Text key={index} style={styles.item}>
                  {skill.name}
                </Text>
              ))}

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
              <Text style={styles.sectionTitle}>Languages</Text>
              {formData.languages.map((languages, index) => (
                <Text key={index} style={styles.item}>
                  {languages.name}
                </Text>
              ))}
              <Text style={styles.sectionTitle}>Basic Details</Text>
              <Text style={styles.item}>Email: {formData.email}</Text>
              <Text style={styles.item}>Phone: {formData.phone}</Text>
              <Text style={styles.item}>Address: {formData.address}</Text>
            </View>

            <View style={styles.rightColumn}>
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
  summary: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'justify',
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '50%',
  },
  rightColumn: {
    width: '60%',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  item: {
    fontSize: 12,
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

export default Resume1;
