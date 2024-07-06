import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from 'react-native-login-screen'
import { router } from 'expo-router';

const login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [register, setRegister] = React.useState<boolean>(false);

    const updateUi = () => {
        if (register) {
            setRegister(false);
        } else {
            setRegister(true);
        }
    }
    return (
        <>
            {
                register ? (
                    <LoginScreen
                        logoImageSource={require('@/assets/images/react-logo.png')}
                        onLoginPress={() => { }}
                        onSignupPress={() => updateUi()}
                        signupText='Already have an account?'
                        loginButtonText='Register'
                        disableSocialButtons={true}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                    />
                ) : (
                    <LoginScreen
                        logoImageSource={require('@/assets/images/react-logo.png')}
                        onLoginPress={() => { }}
                        onSignupPress={() => updateUi()}
                        disableSocialButtons={true}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                    />
                )
            }
        </>

    )
}

export default login