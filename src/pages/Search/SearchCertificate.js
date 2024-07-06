// SearchCertificate.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import License from '../../assets/images/license_icon.svg';
import HRDK_logo from '../../assets/images/HRDK_logo.png';

const SearchCertificate = () => {
  const [jobName, setJobName] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const trimmedJobName = jobName.trim(); // 수정된 부분: 양쪽 끝의 공백 제거
      console.log(`Searching for job name: ${trimmedJobName}`);
      // console.log(`Searching for job name: ${jobName}`);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://10.0.2.2:8080/certifi/job_name', 
        { job_name: trimmedJobName },
        // { job_name: jobName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Certificates fetched successfully:', response.data);
      if (response.data.length === 0) {
        navigation.navigate('CertificateNo');
      } else {
        navigation.navigate('CertificateResult', { certificates: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch certificates', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <License width={40} style={styles.headerIcon}/>
        <Text style={styles.headerText}>자격증시험추가</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="자격증의 이름을 입력하세요."
          value={jobName}
          onChangeText={setJobName}
          onSubmitEditing={handleSearch} // 수정된 부분: Enter 키를 누르면 handleSearch 호출
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>검색하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <License width={100} height={100} style={styles.infoIcon}/>
        <Text style={styles.infoTitle}>자격증시험 일정 추가</Text>
        <Text style={styles.infoText}>원하시는 자격증 이름을 검색하면,</Text>
        <Text style={styles.infoText}>올해 예정된 시험 일정을 추가할 수 있어요!</Text> 
        <Image source={HRDK_logo} style={styles.hrdkLogo} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>※ 현재 국가공인 자격증만 검색할 수 있어요.</Text>
        <Text style={styles.footerText}>검색에 되지 않는 자격증은 자격 일정으로 추가해주세요.</Text>
        <Text style={styles.footerText2}>※ 시험이 종료된 시험 일정은 검색되지 않아요.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16
  },

  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    marginTop: 5
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color : 'black',
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#47BDFF',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#06A4FD',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 35,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoIcon: {
    marginRight : 10

  },
  infoTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    fontFamily : 'NanumSquareEB.ttf'
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  hrdkLogo: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 30
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight : 'medium',
    color: '#06A4FD',
    textAlign: 'center',
    marginTop : -3
  },
  footerText2: {
    fontSize: 14,
    fontWeight : 'medium',
    color: '#06A4FD',
    textAlign: 'center',
    marginTop : 5
  },
});

export default SearchCertificate;

