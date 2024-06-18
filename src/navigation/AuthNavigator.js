import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../pages/Login/LoginPage';
import SignupPage from '../pages/Signup/SignUpPage';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="LoginPage">
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: true ,
                
            }} />
            <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;