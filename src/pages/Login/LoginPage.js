import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage({ navigation }) {
    const { setIsLoggedIn } = useAuth();
    const { setUser } = useAuth();

    const [username, setUsername] = React.useState('');0
    const [password, setPassword] = React.useState('');

    const goToSignup = () => {
        console.log('Go to SignupPage button pressed');
        navigation.navigate('SignupPage');
    };

    const onLogin = async () => {
        try {
            const response = await fetch('http://192.168.56.1:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                await AsyncStorage.setItem('token', data.token);
                setIsLoggedIn(true);
                setUser(data.user);
                console.log('로그인 성공:', data);
                Alert.alert('로그인 성공', '로그인에 성공했습니다.');
                navigation.navigate('MainPage', {
                    params: data.user,
                });
            } else {
                console.log('로그인 실패:', data.message);
                Alert.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('오류 발생:', error);
            Alert.alert('오류 발생', '로그인 중 오류가 발생했습니다.', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>
            <TextInput
                name="username"
                placeholder="아이디"
                value={username}
                onChangeText={setUsername}
                textAlign='center'
                style={styles.textInput}
            />
            <TextInput
                name="password"
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                textAlign='center'
                style={styles.textInput}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={goToSignup}>
                <Text style={styles.buttonText}>Go to SignupPage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#49C8FF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 5,
        width: 200,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#25A4FF'
    },
});

export default LoginPage;